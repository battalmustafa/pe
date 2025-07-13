This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Instagram API Integration

This project includes an Instagram feed that displays the latest 3 posts from the author's Instagram account. To make this work, you need to set up Instagram API credentials:

1. Visit the [Facebook for Developers](https://developers.facebook.com/) site and create a new app
2. Set up the Instagram Basic Display API for your app
3. Follow the steps to authenticate your Instagram account and obtain an access token
4. Copy the `.env.local.example` file to `.env.local` and add your credentials:

```bash
# Instagram API Credentials
INSTAGRAM_CLIENT_ID=your_instagram_client_id
INSTAGRAM_CLIENT_SECRET=your_instagram_client_secret
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token
```

The Instagram access token is the most important one and is required for the API to work. The token expires after a certain period, so you may need to refresh it periodically.

### Mock Data Fallback

The Instagram integration includes a fallback mechanism that uses mock data when:
- Instagram API credentials are not configured
- The Instagram API is unavailable or returns an error
- There are network connectivity issues

This ensures that your website always displays content in the Instagram section, even when the API cannot be accessed. The mock data is stored in the API route at `src/app/api/instagram/route.ts` and can be customized as needed.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
