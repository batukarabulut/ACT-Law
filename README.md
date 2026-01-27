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

## Sanity Studio - Content Management

Sanity Studio is hosted on Sanity's servers for better security and performance. Content editors can access it at:

**`https://ahmet-can-tonus-hukuk.sanity.studio`**

### Deploying Studio

To deploy or update the Studio, run:

```bash
npm run studio:deploy
```

This will deploy the Studio configuration to Sanity's servers. You only need to do this when you make changes to the Studio configuration or schemas.

**First-time deployment:** When you run `npm run studio:deploy` for the first time, you'll be prompted to enter a hostname. Enter `ahmet-can-tonus-hukuk` (or your preferred hostname).

### First-Time Setup

1. **Sanity Account Required**: The editor needs a Sanity account to log in.
2. **Project Access**: Add the editor as a member to your Sanity project:
   - Go to [sanity.io/manage](https://sanity.io/manage)
   - Select your project
   - Navigate to "Members" → "Invite member"
   - Add the editor's email and assign appropriate role (Editor or Administrator)

### Available Content Types

In Sanity Studio, editors can manage:

- **Site Config**: Phone, email, address, working hours
- **About**: Title, description, content
- **Practice Areas**: Title, description, services
- **Blog Posts**: Title, content, category, featured image
- **FAQ**: Questions and answers
- **Legal Content**: Terms of Use, Privacy Notice, Cookie Policy

### Updates

Changes made in Sanity Studio are automatically saved to Sanity. The Next.js application fetches data from Sanity, so updates typically appear on the live site within a few seconds.

### Benefits of Hosted Studio

- ✅ **Better Security**: Studio is hosted on Sanity's secure infrastructure, not publicly accessible on your main site
- ✅ **No SEO Impact**: Studio is not indexed by search engines
- ✅ **Better Performance**: Studio doesn't affect your main site's performance
- ✅ **Automatic Updates**: Sanity handles Studio updates and maintenance
