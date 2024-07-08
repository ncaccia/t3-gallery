# t3 Gallerry Workshop

- [Theo - t3.gg | From 0 to Production - The Modern React Tutorial (RSCs, Next.js, Shadui, Drizzle, TS and more) ](https://www.youtube.com/watch?v=d5x0JCZbAJs)

## TO-DO

- [x] Make it deploy (vercel)
- [x] Scaffold basic ui with mock data
- [x] Tidy up build process (this was a remainder)
- [x] Set up a database (vercel postgres)
  - [x] fixe some db errors
- [x] Attach database to UI - Building the schema for the db
- [x] Add authentication (w/ clerk)
  - [x] Lock homepage access under the auth.
- [x] Add image upload
- [ ] Use Next/Image component (Fix <img> warnings)
- [ ] "taint" (server-only) ->
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
- to query the db: `const images = await db.query.images.findMany();`
  - By default the order of the query is **ASC** (from the oldest to the newest). We can use drizzel model to re-arrange:
    ```ts
    const images = await db.query.images.findMany({
      orderBy: (model, { desc }) => desc(model.id),
    });
    ```

### Adding authentication

- Open Source and free tools:

  - [next-auth](https://next-auth.js.org/) or
  - [lucia](https://lucia-auth.com/)

- Paying options:
  - [Clerk](https://clerk.com/docs/quickstarts/nextjs)
    - We add a middleware witht the config
    - Nice component for `<SignedOut>` or `<SignedIn>` which detects if we are actually signedIn and switches depending on the case
    - !!! add the clerk variables to the vercel setings
    - Hiding things under the auth is as easy as nesting components under `<SignedOut>` or </`SignedIn>`
      ```html
      <main className="">
        <SignedOut>
          <div className="h-full w-full text-2xl p-4 text-center">
            Please Sign In to access the Gallery
          </div>
        </SignedOut>
        <SignedIn>
          <Gallery />
        </SignedIn>
      </main>
      ```

### Adding image upload

- We are using the uploadthings library
  - remember to paste API KEYS on the vercel settings.
- If we add the endpoint element to our component, we get a list of all the endpoints that exist on our router. `<UploadButton endpoint="imageUploader" />`
- To connect the upload to the db ->
  ```ts
  await db.insert(images).values({
    name: file.name,
    url: file.url,
  });
  ```
- After we connect and upload, to avoid having to refresh to render the new img uploaded, we need to ->
  - call the useRouter from next/navigation (!!! not from next/router)`const router = useRouter();
  - add the `onClientUploadComplete={() => router.refresh()}` to the UploadButton to rerun the route our user is on, on the server.

---

### Extra learnings on the process

- Vercel block automated/external services -> bypass setting is needed on enviroment settings. This can also affect other services.
  - [Vercel doc](https://vercel.com/docs/security/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation#using-protection-bypass-for-automation)
  - [Uploadthings doc](https://docs.uploadthing.com/faq#my-callback-runs-in-development-and-production-but-not-in-vercel-preview-deployments)
  
- `<Images />` component. If I use <img> I get warnings. If I use external urls, Its a **must** to whitelist urls using [remotePatterns](https://nextjs.org/docs/pages/api-reference/components/image#remotepatterns) in next.config

- `export const dynamic = "force-dynamic";` --> We need to explicitly tell nextjs that the content is supose to be dynamic to avoid the cache from showing outdated data.
  `

- Select typescript version of the workspace to gurantee that VSC uses the last version and intelligense works better.

- add a dev branch

- Nextjs auto import --> add the `<` before adding the name of the component to the code ex: `<SignedOut` and it will show the intelisense options + import automatically
