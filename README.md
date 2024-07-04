# t3 Gallerry Workshop

- [Theo - t3.gg | From 0 to Production - The Modern React Tutorial (RSCs, Next.js, Shadui, Drizzle, TS and more) ](https://www.youtube.com/watch?v=d5x0JCZbAJs)

## TO-DO

- [x] Make it deploy (vercel)
- [x] Scaffold basic ui with mock data
- [x] Tidy up build process (this was a remainder)
- [x] Set up a database (vercel postgres)
  - [x] fixe some db errors
  - [x] Fix <img> warnings
- [ ] Attach database to UI
- [ ] Add authentication (w/ clerk)
- [ ] Add image upload
  - [ ] "taint" (server-only)
  - [ ] Use Next/Image component
- [ ] Error management (w/ Sentry)
- [ ] Routing/image page (parallel route)
  - [ ] Update upload button to be less cringe
- [ ] Analytics (posthog)
- [ ] Delete button (w/ Server Actions)
- [ ] Ratelimiting (upstash)

### A challenge to the viewer

- [ ] Fix the page layout for images of different resolutions
- [ ] "Selecting" images on the gallery page
- [ ] "infinite scroll"
- [ ] Folders/albums

## Main learnings

### Tidy up build process

- Edit `next.config.js` to avoid the build being stopped. We can check this on gh.

```js
const config = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
export default config;
```

- Turn ON turbo on dev (package.jason) `"dev": "next dev --turbo",` -> This speedgs up the dev env.

### Setting up a database (Vercel)

- (!!!) Make sure regions between server and dbs are the same.
- The name of the DATABASE_URL is important, in our case, we have ti find-and-replace all for POSTGRES_URL to avoid **conflicts with Vercel**.
- Initiate with the command `pnpm run db:push`

### Extra learnings on the process

- `<Images />` component. If I use <img> I get warnings. If I use external urls, Its a **must** to whitelist urls using [remotePatterns](https://nextjs.org/docs/pages/api-reference/components/image#remotepatterns) in next.config
- `export const dynamic = "force-dynamic";` --> We need to explicitly tell nextjs that the content is supose to be dynamic to avoid the cache from showing outdated data.
  `
- Select typescript version of the workspace to gurantee that VSC uses the last version and intelligense works better.
