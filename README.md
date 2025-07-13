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

## Database

This app use mongodb as the databse, you can use docker to set up your database locally

Just run this command on your terminal to start the database locally:

```
docker run -d \
  --name mongodb-dev \
  -p 27017:27017 \
  -v mongo-libdata:/data/db \
  mongo:latest
```

And paste this into your .env file, use your .env example as reference

```
MONGODB_URI="mongodb://localhost:27017/librarydb"
```

You can connect your local database running on docker with Mongo Compass, just use `localhost:27017` to connect with your compass
