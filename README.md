<h1 align="center">GreenLeaf — Next.js Waitlist Template</h1>

<p align="center">

<img src ="https://img.shields.io/badge/Next.js-000000.svg?style=for-the-badge&logo=nextdotjs&logoColor=white">
<img src ="https://img.shields.io/badge/Upstash-00E9A3.svg?style=for-the-badge&logo=Upstash&logoColor=white">
<img src ="https://img.shields.io/badge/Neon-00E699.svg?style=for-the-badge&logo=Neon&logoColor=white">
<img src ="https://img.shields.io/badge/Resend-000000.svg?style=for-the-badge&logo=Resend&logoColor=white">
<img src ="https://img.shields.io/badge/shadcn/ui-000000.svg?style=for-the-badge&logo=shadcn/ui&logoColor=white">
<img src ="https://img.shields.io/badge/Vercel-000000.svg?style=for-the-badge&logo=Vercel&logoColor=white">
<img src ="https://img.shields.io/badge/Drizzle-000000.svg?style=for-the-badge&logo=Drizzle&logoColor=white">

</p>

![GithubBanner](./app/greenleaf.png)

This is a template repository for creating a waitlist using Next.js 14, Neon PostgreSQL for data storage, Drizzle ORM for database operations, Upstash Redis for rate limiting, and Resend for sending emails with a custom domain.

The UI is built using a mix of shadcn/ui, Magic UI and Tailwind CSS.

**Demo:** [https://greenleaf-waitlist.vercel.app](https://greenleaf-waitlist.vercel.app)

## Features

- **Next.js 14**: The most popular React framework
- **Neon PostgreSQL**: Serverless Postgres database for storing waitlist subscribers
- **Drizzle ORM**: Type-safe, lightweight SQL ORM for database operations
- **Upstash Redis**: Use Upstash Redis to rate limit the number of signups
- **Resend**: Send beautiful transactional emails to waitlist subscribers
- **Vercel**: Deploy the app to Vercel with a single click
- **shadcn/ui**: Beautiful, accessible UI components built with Radix UI and Tailwind CSS

## How to get started?

There are a few things you need to set up before using this template:

### 1. Neon PostgreSQL

1. Sign up for a free account at [neon.tech](https://neon.tech)
2. Create a new project
3. In your project dashboard, click on "Connection Details" to get your connection string
4. Copy the connection string that looks like: `postgresql://user:password@hostname/database`

This connection string will be used as your `DATABASE_URL` environment variable.

### 2. Upstash Redis

1. Sign up for a free account at [upstash.com](https://upstash.com)
2. Create a new Redis database
3. After creation, navigate to the "REST API" section
4. Copy the `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` values

These will be used as environment variables in your project.

### 3. Resend

1. Sign up for a Resend account at [resend.com](https://resend.com)
2. Navigate to API Keys in your dashboard
3. Create a new API key and copy it
4. For production use, add and verify your domain under the "Domains" section

The API key will be used as your `RESEND_API_KEY` environment variable.

## Building with this template

There are two ways to use this template:

### 1. Deploy to Vercel

Click the button below to deploy this template to Vercel with a single click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fabhishekgusain07%2FGreenleaf-waitlist-template&env=DATABASE_URL,RESEND_API_KEY,UPSTASH_REDIS_REST_URL,UPSTASH_REDIS_REST_TOKEN)

You will need to provide the following environment variables:

- `DATABASE_URL`: Your Neon PostgreSQL connection string
- `RESEND_API_KEY`: Your Resend API key
- `UPSTASH_REDIS_REST_URL`: Your Upstash Redis REST URL
- `UPSTASH_REDIS_REST_TOKEN`: Your Upstash Redis REST token

### 2. Manual Setup

1. Fork this repository and clone it to your local machine

2. Install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Create a `.env` file in the root directory with the following variables:

```
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@hostname/database"

# Email (Resend)
RESEND_API_KEY="re_xxxxxxxxxxxx"

# Rate Limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL="https://xxxx.upstash.io"
UPSTASH_REDIS_REST_TOKEN="xxxxxxxxxxxxxx"
```

4. Run the database migrations:

```bash
npm run db:generate
npm run db:migrate
```

5. Start the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

7. To preview emails during development:

```bash
npm run email
```

## Customizing the template

### Email Template

The email template is located in `emails/index.tsx`. You can modify it to match your brand's style and message.

### Database Schema

The database schema is defined in `app/lib/db/schema.ts`. You can modify it to add or remove fields from the waitlist table.

### Frontend

The main page is in `app/page.tsx`. You can customize the design, color scheme, and content to match your product.

## License

You can use this template for personal or commercial projects. Feel free to modify it as you like.

However, if you use this template for commercial projects, please consider [buying me a coffee](https://www.buymeacoffee.com/abhishekgusain) or sponsoring me on GitHub. It will help me to keep creating more templates like this.

<a href="https://www.buymeacoffee.com/abhishekgusain" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50" width="200"></a>

---

If you have any questions or need help with this template, feel free to reach out to me on [Twitter](https://twitter.com/abhishekgusain_) or open an issue on this repository.
