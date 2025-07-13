# Email Setup Guide

## Required Environment Variables

To enable email functionality, you need to set up the following environment variable:

### 1. Create `.env.local` file

Create a `.env.local` file in the root directory of your project and add:

```
RESEND_API_KEY=your_resend_api_key_here
```

### 2. Get Resend API Key

1. Go to [Resend.com](https://resend.com)
2. Sign up for a free account
3. Navigate to API Keys section
4. Generate a new API key
5. Copy the API key and replace `your_resend_api_key_here` in your `.env.local` file

### 3. Email Configuration

All forms will send emails to: `battalmustafa88@gmail.com`

The following forms are configured:
- **Hızlı Başvuru** (`/hizli-basvuru`) - Quick application form
- **İletişim** (`/iletisim`) - Contact form  
- **Kurgu Şantiyesi Kayıt** (`/kurgu-santiyesi-kayit`) - Workshop registration form

### 4. Netlify Deployment

For Netlify deployment, add the environment variable in your Netlify dashboard:
1. Go to your site's dashboard
2. Navigate to Site settings > Environment variables
3. Add `RESEND_API_KEY` with your API key value

### 5. Domain Setup (Optional)

By default, emails are sent from `onboarding@resend.dev`. For production, you may want to:
1. Add your domain to Resend
2. Update the `from` field in `/src/app/api/send-email/route.ts`

## Testing

After setup, test each form to ensure emails are being sent successfully. 