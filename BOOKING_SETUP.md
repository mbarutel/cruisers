# Booking System Setup Guide

The booking system is now integrated into the website. Follow these steps to complete the setup.

## 1. Get a Resend API Key

1. Go to [resend.com](https://resend.com) and sign up for a free account
2. Verify your email address
3. Navigate to API Keys in the dashboard
4. Create a new API key
5. Copy the API key (starts with `re_`)

## 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file and add your configuration:

```env
NUXT_RESEND_API_KEY=re_your_actual_api_key_here
NUXT_RESORT_EMAIL=cruisersseafront@gmail.com
```

**Important:** Never commit the `.env` file to Git. It's already in `.gitignore`.

## 3. Verify Domain (Production Only)

For production use, you need to verify your sending domain in Resend:

1. In Resend dashboard, go to "Domains"
2. Click "Add Domain"
3. Follow the instructions to add DNS records
4. Once verified, update the `from` field in `server/api/booking.post.ts`:

```typescript
from: 'Cruisers Resort Bookings <bookings@yourdomain.com>',
```

For testing, you can use Resend's test domain: `bookings@resend.dev`

## 4. Test the Booking System

### Local Development

1. Start the development server:
```bash
npm run dev
```

2. Navigate to http://localhost:3000
3. Scroll to the "Book Your Stay" section
4. Fill out the booking form
5. Submit and check that:
   - Success message appears
   - Email is received at `cruisersseafront@gmail.com`

### Testing Checklist

- [ ] Form validation works (try submitting empty fields)
- [ ] Date validation (check-out must be after check-in)
- [ ] Email format validation
- [ ] Success message displays after submission
- [ ] Email arrives with correct booking details
- [ ] Rate limiting works (try submitting 4+ times in an hour)

## 5. Production Deployment

### Update Environment Variables on Digital Ocean

SSH into your droplet and update the Docker run command in `.github/workflows/deploy.yml`:

```yaml
docker run -d \
  --name cruisers \
  --restart unless-stopped \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e NUXT_RESEND_API_KEY=your_actual_api_key \
  -e NUXT_RESORT_EMAIL=cruisersseafront@gmail.com \
  ${{ env.IMAGE_NAME }}:latest
```

Or set environment variables via GitHub Secrets:
1. Go to GitHub repo → Settings → Secrets and variables → Actions
2. Add secrets:
   - `RESEND_API_KEY`
   - `RESORT_EMAIL`

Then update the workflow to use them.

## Features Implemented

### Booking Form
- ✅ Calendar date picker for check-in/check-out
- ✅ Room type selection (3 room types)
- ✅ Guest count (adults and children)
- ✅ Contact information (name, email, phone)
- ✅ Special requests textarea
- ✅ Form validation with error messages
- ✅ Loading states during submission
- ✅ Success/error messages

### Email Notifications
- ✅ Professional HTML email template
- ✅ All booking details included
- ✅ Reply-to set to guest email
- ✅ Formatted dates and calculated nights

### Security
- ✅ Rate limiting (3 requests per hour per IP)
- ✅ Server-side validation
- ✅ Email format validation
- ✅ Date logic validation

### Integration
- ✅ Replaced all Booking.com links
- ✅ Smooth scroll to booking section
- ✅ Updated Hero, CTA, and Footer components
- ✅ Dedicated booking section in page flow

## Rate Limiting

The system limits each IP address to 3 booking submissions per hour. This prevents spam while allowing legitimate users to make corrections if needed.

For production with multiple servers, consider upgrading to Redis-based rate limiting.

## Troubleshooting

### Email not sending

1. Check that `NUXT_RESEND_API_KEY` is set correctly
2. Verify Resend API key is active in dashboard
3. Check server logs: `docker logs cruisers`
4. For production, ensure domain is verified

### Form not submitting

1. Open browser console (F12) to check for errors
2. Verify API endpoint is accessible: `curl http://localhost:3000/api/booking`
3. Check network tab for failed requests

### Rate limiting too strict

Edit `server/api/booking.post.ts` and adjust:
```typescript
const MAX_REQUESTS = 5 // Increase limit
const WINDOW_MS = 60 * 60 * 1000 // Adjust time window
```

## Next Steps (Optional Enhancements)

- [ ] Add confirmation email to guests
- [ ] Integrate with Google Calendar
- [ ] Add booking calendar showing availability
- [ ] Create admin dashboard to view bookings
- [ ] Add SMS notifications via Twilio
- [ ] Implement booking deposits/payments
- [ ] Add multi-language support

## Support

For issues or questions, check:
- [Resend Documentation](https://resend.com/docs)
- [Nuxt Documentation](https://nuxt.com/docs)
- [v-calendar Documentation](https://vcalendar.io)
