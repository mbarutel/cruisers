import { Resend } from 'resend'

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const MAX_REQUESTS = 3 // Maximum 3 requests
const WINDOW_MS = 60 * 60 * 1000 // Per hour

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  // Get client IP for rate limiting
  const clientIP = getRequestHeader(event, 'x-forwarded-for') || 
                   getRequestHeader(event, 'x-real-ip') || 
                   'unknown'

  // Check rate limit
  const now = Date.now()
  const rateLimitData = rateLimitMap.get(clientIP)

  if (rateLimitData) {
    if (now < rateLimitData.resetTime) {
      if (rateLimitData.count >= MAX_REQUESTS) {
        throw createError({
          statusCode: 429,
          statusMessage: 'Too many booking requests. Please try again later.'
        })
      }
      rateLimitData.count++
    } else {
      // Reset the window
      rateLimitMap.set(clientIP, { count: 1, resetTime: now + WINDOW_MS })
    }
  } else {
    rateLimitMap.set(clientIP, { count: 1, resetTime: now + WINDOW_MS })
  }

  const body = await readBody(event)

  // Validate required fields
  const requiredFields = ['roomType', 'checkIn', 'checkOut', 'adults', 'name', 'email', 'phone']
  for (const field of requiredFields) {
    if (!body[field]) {
      throw createError({
        statusCode: 400,
        statusMessage: `Missing required field: ${field}`
      })
    }
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(body.email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email address'
    })
  }

  // Validate dates
  const checkInDate = new Date(body.checkIn)
  const checkOutDate = new Date(body.checkOut)
  
  if (checkOutDate <= checkInDate) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Check-out date must be after check-in date'
    })
  }

  // Calculate number of nights
  const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))

  try {
    const resend = new Resend(config.resendApiKey)

    // Format dates for display
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    // Create email HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
              color: white;
              padding: 30px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              background: #f9fafb;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .section {
              background: white;
              padding: 20px;
              margin-bottom: 20px;
              border-radius: 8px;
              border-left: 4px solid #10b981;
            }
            .section h2 {
              margin-top: 0;
              color: #10b981;
              font-size: 18px;
            }
            .detail-row {
              display: flex;
              padding: 8px 0;
              border-bottom: 1px solid #e5e7eb;
            }
            .detail-row:last-child {
              border-bottom: none;
            }
            .detail-label {
              font-weight: 600;
              width: 140px;
              color: #6b7280;
            }
            .detail-value {
              color: #111827;
            }
            .highlight {
              background: #d1fae5;
              padding: 2px 8px;
              border-radius: 4px;
              font-weight: 600;
              color: #065f46;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #e5e7eb;
              color: #6b7280;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🏖️ New Booking Request</h1>
            <p style="margin: 10px 0 0 0;">Cruiser's Beach Resort & Farm</p>
          </div>
          
          <div class="content">
            <div class="section">
              <h2>📅 Reservation Details</h2>
              <div class="detail-row">
                <div class="detail-label">Room Type:</div>
                <div class="detail-value"><span class="highlight">${body.roomType}</span></div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Check-in:</div>
                <div class="detail-value">${formatDate(checkInDate)}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Check-out:</div>
                <div class="detail-value">${formatDate(checkOutDate)}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Duration:</div>
                <div class="detail-value"><strong>${nights} night${nights > 1 ? 's' : ''}</strong></div>
              </div>
            </div>

            <div class="section">
              <h2>👥 Guest Information</h2>
              <div class="detail-row">
                <div class="detail-label">Adults:</div>
                <div class="detail-value">${body.adults}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Children:</div>
                <div class="detail-value">${body.children || 0}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Total Guests:</div>
                <div class="detail-value"><strong>${body.adults + (body.children || 0)}</strong></div>
              </div>
            </div>

            <div class="section">
              <h2>📞 Contact Information</h2>
              <div class="detail-row">
                <div class="detail-label">Name:</div>
                <div class="detail-value"><strong>${body.name}</strong></div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Email:</div>
                <div class="detail-value"><a href="mailto:${body.email}">${body.email}</a></div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Phone:</div>
                <div class="detail-value"><a href="tel:${body.phone}">${body.phone}</a></div>
              </div>
            </div>

            ${body.specialRequests ? `
            <div class="section">
              <h2>💬 Special Requests</h2>
              <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${body.specialRequests}</p>
            </div>
            ` : ''}

            <div class="footer">
              <p>This booking request was submitted via the Cruiser's Beach Resort website.</p>
              <p style="margin-top: 10px;">Please respond to the guest within 24 hours.</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Send email to resort
    const { data, error } = await resend.emails.send({
      from: 'Cruisers Resort Bookings <bookings@resend.dev>',
      to: config.resortEmail,
      replyTo: body.email,
      subject: `New Booking Request - ${body.name} (${formatDate(checkInDate)})`,
      html: emailHtml
    })

    if (error) {
      console.error('Resend error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to send booking request'
      })
    }

    return {
      success: true,
      message: 'Booking request sent successfully'
    }
  } catch (error: any) {
    console.error('Booking submission error:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to process booking request'
    })
  }
})
