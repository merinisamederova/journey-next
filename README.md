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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Backend environment variables

Add these variables in Vercel Project Settings -> Environment Variables:

```bash
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

ADMIN_PASSWORD=
ADMIN_AUTH_SECRET=

WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_MANAGER_PHONE=996703367477
WHATSAPP_GRAPH_VERSION=v25.0
```

Notes:

- `ADMIN_PASSWORD` is the password for `/admin/login`.
- `ADMIN_AUTH_SECRET` is used to sign the admin cookie. Use a long random value.
- `SUPABASE_SERVICE_ROLE_KEY` must stay server-only. Never expose it in browser code.
- WhatsApp Cloud API variables are needed for automatic manager notifications. Without them, the booking form still opens WhatsApp with a prepared message.
