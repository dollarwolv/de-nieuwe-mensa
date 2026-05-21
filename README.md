# De Nieuwe Mensa Website

The website and CMS for **De Nieuwe Mensa**, a student-led non-profit canteen initiative at the University of Amsterdam. The project combines a public-facing website, a Payload CMS admin area, menu management, food voting, catering requests, blog publishing, dish pages, and transparency dashboards for sales and student feedback.

This README is intentionally detailed. It is written for two audiences:

1. People reviewing this GitHub repository who want to understand the engineering decisions behind the project.
2. De Nieuwe Mensa maintainers who need to change content, fix bugs, update menus, or extend the codebase.

## Table of Contents

- [Project Context](#project-context)
- [What This Application Does](#what-this-application-does)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Local Development](#local-development)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Application Routes](#application-routes)
- [Payload CMS](#payload-cms)
- [Data Model](#data-model)
- [Menu System](#menu-system)
- [Voting System](#voting-system)
- [Catering System](#catering-system)
- [Transparency Dashboards](#transparency-dashboards)
- [Styling and Design System](#styling-and-design-system)
- [Common Maintenance Tasks](#common-maintenance-tasks)
- [Working With Images and Media](#working-with-images-and-media)
- [API Routes](#api-routes)
- [Database Notes](#database-notes)
- [Deployment Notes](#deployment-notes)
- [Quality Checks](#quality-checks)
- [Troubleshooting](#troubleshooting)
- [Notes for Future Developers](#notes-for-future-developers)

## Project Context

De Nieuwe Mensa is not just a marketing site. It supports the real day-to-day operation of a student canteen.

The project exists because DNM needs a digital home for several practical workflows:

- Explain the mission: affordable, healthy, plant-based student food.
- Show the current and upcoming menu.
- Let students rate meals after eating.
- Collect catering requests.
- Publish blog posts and updates.
- Document dishes, ingredients, nutrition, and recipes.
- Show transparent charts about sales and feedback.
- Give DNM members a CMS so they can update content without editing code.

The site is built around the idea that DNM should be understandable and maintainable by future student teams. Most operational content lives in Payload CMS. More structural page content and design-heavy sections live in React components.

## What This Application Does

The app has three main parts:

### 1. Public Website

The public website contains the visible pages students, partners, and visitors use:

- Home page with project story, menu preview, values, and catering CTA.
- About page with history, suppliers, partners, board members, and cooks.
- Dishes index and detail pages.
- Blog index and article pages.
- Vote page for daily food ratings.
- Catering page and quote form.
- Transparency page with charts.

### 2. CMS Admin

Payload CMS is mounted inside the Next.js app at:

```txt
/admin
```

Admin users can manage:

- Dishes
- Blog posts
- Media uploads
- Testimonials
- Board members
- Cooks
- Votes
- Catering requests
- Sales entries
- Menu settings

### 3. API Layer

Next.js route handlers power the dynamic functionality:

- Menu calculation
- Vote submission
- Dish lookup by date
- Catering form submission and email notification
- Sales chart data
- Vote chart data

Some API routes use Payload directly. The chart routes use SQL through `pg` for grouped aggregate queries.

## Tech Stack

### Core

- **Next.js 15** with the App Router
- **React 19**
- **Payload CMS 3**
- **PostgreSQL**
- **Node.js runtime route handlers**

### CMS and Storage

- `payload`
- `@payloadcms/next`
- `@payloadcms/db-postgres`
- `@payloadcms/richtext-lexical`
- `@payloadcms/storage-vercel-blob`
- `@payloadcms/email-resend`

### Frontend and UI

- **Tailwind CSS 4**
- **shadcn-style UI components**
- **Radix UI** primitives
- **Recharts** for data visualization
- **Framer Motion** for animation
- **next-view-transitions** for page transitions
- **next/font** with local Garet font files and Montserrat
- **lucide-react** for icons where used

### Infrastructure

- Vercel-compatible Next.js app
- Vercel Blob for uploaded media
- Resend for transactional email
- PostgreSQL database configured through `DATABASE_URL`

## Repository Structure

```txt
.
|-- app/
|   |-- (frontend)/              # Public website routes and layout
|   |-- (payload)/               # Payload admin and Payload API routes
|   `-- api/                     # Custom Next.js API routes
|-- collections/                 # Payload collection definitions
|-- components/                  # React components grouped by feature
|-- components/ui/               # Shared UI primitives
|-- globals/                     # Payload global configs
|-- lib/                         # Shared helpers and database pool
|-- public/                      # Static assets, logos, fonts, photos
|-- payload.config.ts            # Payload CMS configuration
|-- payload-types.ts             # Generated Payload TypeScript types
|-- next.config.mjs              # Next config wrapped by Payload
|-- package.json                 # Scripts and dependencies
`-- tsconfig.json                # TypeScript and path alias config
```

### Important Directories

#### `app/(frontend)`

Contains the public-facing Next.js pages.

The parentheses mean this is a route group. The folder name does not appear in the URL. For example:

```txt
app/(frontend)/about/page.jsx -> /about
app/(frontend)/vote/page.jsx  -> /vote
```

#### `app/(payload)`

Contains the Payload admin and Payload API integration routes.

Important routes:

```txt
/admin
/api/[...slug]
/api/graphql
/api/graphql-playground
```

#### `app/api`

Contains custom API route handlers used by the frontend.

Examples:

```txt
app/api/menu/route.js
app/api/vote/route.js
app/api/catering/route.js
```

#### `collections`

Payload collection configs. If you want to add fields to the CMS, this is usually where you start.

#### `globals`

Payload global configs. Currently this contains `MenuSettings`, which controls the rotating A/B menu.

#### `components`

Reusable React components, grouped by feature:

```txt
components/AboutPage/
components/Blog/
components/Catering/
components/Dishes/
components/General/
components/LandingPage/
components/Transparency/
components/ui/
```

#### `public`

Static assets:

- Logos
- Fonts
- Food photos
- About page photos
- Catering photos
- SVG assets

Static files in `public` are referenced from the site root:

```jsx
<img src="/logo.svg" alt="De Nieuwe Mensa logo" />
```

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a local environment file:

```bash
.env.local
```

At minimum, the app needs:

```bash
DATABASE_URL="postgres://..."
PAYLOAD_SECRET="a-long-random-secret"
BLOB_READ_WRITE_TOKEN="..."
RESEND_API_KEY="..."
```

More detail is in [Environment Variables](#environment-variables).

### 3. Run the Development Server

```bash
npm run dev
```

The app runs at:

```txt
http://localhost:3000
```

The Payload admin runs at:

```txt
http://localhost:3000/admin
```

### 4. Build Before Deploying

```bash
npm run build
```

This validates that the app can compile, type-check, collect page data, and generate static pages.

## Environment Variables

The project reads the following environment variables:

| Variable | Used By | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Payload, `lib/db.js`, chart API routes | PostgreSQL connection string |
| `PAYLOAD_SECRET` | Payload | Secret used by Payload for auth and signing |
| `BLOB_READ_WRITE_TOKEN` | Payload Vercel Blob plugin | Allows uploaded media to be stored in Vercel Blob |
| `RESEND_API_KEY` | Payload email adapter | Sends catering request notifications |
| `NODE_ENV` | Next.js and route handlers | Controls production behavior, including secure cookies and Postgres SSL |

### Notes

- `.env`, `.env.local`, and other env files are ignored by git.
- Never commit secrets.
- Production should define all variables in the deployment provider.
- `PAYLOAD_SECRET` should be long and random.
- `DATABASE_URL` must point to a PostgreSQL database compatible with Payload.

## Scripts

Defined in `package.json`:

```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

### `npm run dev`

Runs the development server with Turbopack.

Use this for local development.

### `npm run build`

Creates a production build.

Use this before deploying or after significant code changes.

### `npm run start`

Starts the production server after a successful build.

Usually only needed for local production testing.

### `npm run lint`

Runs the configured Next lint command.

Note: the build command also performs linting/type validation as part of the production build process.

## Application Routes

### Public Pages

| Route | File | Purpose |
| --- | --- | --- |
| `/` | `app/(frontend)/page.jsx` | Home page with mission, menu preview, story, values, and catering CTA |
| `/about` | `app/(frontend)/about/page.jsx` | Project history, philosophy, suppliers, partners, board, cooks |
| `/dishes` | `app/(frontend)/dishes/page.jsx` | Dish index loaded from Payload |
| `/dishes/[slug]` | `app/(frontend)/dishes/[slug]/page.jsx` | Dish detail page with image, nutrition, ingredients, recipe |
| `/blog` | `app/(frontend)/blog/page.jsx` | Published blog post index |
| `/blog/[slug]` | `app/(frontend)/blog/[slug]/page.jsx` | Blog post detail page |
| `/vote` | `app/(frontend)/vote/page.jsx` | Daily food rating form |
| `/vote/vote-success` | `app/(frontend)/vote/vote-success/page.jsx` | New vote confirmation |
| `/vote/vote-updated` | `app/(frontend)/vote/vote-updated/page.jsx` | Existing vote updated confirmation |
| `/catering` | `app/(frontend)/catering/page.jsx` | Catering landing page and quote form |
| `/catering/request-success` | `app/(frontend)/catering/request-success/page.jsx` | Catering request confirmation |
| `/transparency` | `app/(frontend)/transparency/page.jsx` | Financial and feedback dashboards |
| `/params-test` | `app/(frontend)/params-test/page.jsx` | Utility/test page for dish-date lookup |

### Admin and Payload Routes

| Route | Purpose |
| --- | --- |
| `/admin` | Payload CMS admin |
| `/api/[...slug]` | Payload REST API |
| `/api/graphql` | Payload GraphQL API |
| `/api/graphql-playground` | GraphQL playground |

## Payload CMS

Payload is configured in:

```txt
payload.config.ts
```

The config does four important things:

1. Registers all CMS collections.
2. Registers the `menuSettings` global.
3. Configures PostgreSQL as the database.
4. Configures Vercel Blob for media uploads and Resend for email.

### Admin User

Payload uses the `users` collection for admin authentication:

```ts
admin: {
  user: Users.slug
}
```

### Rich Text

Rich text fields use Payload's Lexical editor:

```ts
editor: lexicalEditor()
```

This is used for:

- Dish recipes
- Blog post bodies

### Media Storage

Media uploads use the `media` collection and are stored through Vercel Blob:

```ts
vercelBlobStorage({
  collections: {
    media: true
  }
})
```

Every media item requires an `alt` field. This is good for accessibility and should be kept.

## Data Model

### `users`

File:

```txt
collections/Users.ts
```

Purpose:

- Payload admin authentication.

Important fields:

- Email and password are provided by Payload auth.

### `media`

File:

```txt
collections/Media.ts
```

Purpose:

- Uploaded images and media files.

Important fields:

- `alt`: required alt text.

Used by:

- Dish images
- Blog cover images
- Testimonial profile pictures
- Board/cook profile pictures

### `dishes`

File:

```txt
collections/Dishes.js
```

Purpose:

- Stores reusable dish content for menus, dish pages, voting, and catering lookup.

Important fields:

- `name`
- `slug`
- `image`
- `description`
- `recipe`
- `ingredients`
- `nutrition`

Notes:

- Slugs are unique.
- If no slug is provided, a slug is generated from the dish name.
- Slugs are used in URLs like `/dishes/lentil-daal`.

### `votes`

File:

```txt
collections/Votes.js
```

Purpose:

- Stores student ratings.

Important fields:

- `dish`
- `satisfaction`
- `tastiness`
- `fillingness`
- `healthiness`
- `valueForMoney`
- `remarks`
- `voteDate`
- `voterId`

Notes:

- Ratings are intended to be between 1 and 10.
- `voterId` is stored in an HTTP-only cookie to limit voting to once per day per browser.

### `cateringRequests`

File:

```txt
collections/CateringRequests.js
```

Purpose:

- Stores submitted catering quote requests.

Important fields:

- `name`
- `email`
- `phone`
- `eventAbout`
- `eventDate`
- `eventTime`
- `location`
- `guestCount`
- `dishRequest`
- `desiredDish`
- `remarks`
- `submittedAt`

### `blogPosts`

File:

```txt
collections/BlogPosts.js
```

Purpose:

- Stores blog/news posts.

Important fields:

- `title`
- `coverImage`
- `author`
- `slug`
- `summary`
- `posted`
- `postedDate`
- `featured`
- `textBody`

Notes:

- Only posts where `posted` is checked appear on the public blog page.
- `postedDate` is automatically set when a post is published.
- Only one post should ideally be marked as `featured`.

### `salesEntries`

File:

```txt
collections/SalesEntries.js
```

Purpose:

- Stores sales numbers for transparency charts.

Important fields:

- `date`
- `amount`

### `boards`

File:

```txt
collections/Boards.js
```

Purpose:

- Stores board members grouped by year.

Important fields:

- `year`
- `members`
- `members.name`
- `members.role`
- `members.profilePicture`

### `cooks`

File:

```txt
collections/Cooks.js
```

Purpose:

- Stores cooks grouped by year.

Important fields:

- `year`
- `members`
- `members.name`
- `members.profilePicture`

### `testimonials`

File:

```txt
collections/Testimonials.js
```

Purpose:

- Stores quotes from students or supporters.

Important fields:

- `name`
- `studyprogram`
- `quote`
- `profilePicture`

Note:

- The testimonial component exists, but the homepage currently has it commented out.

## Menu System

The menu is controlled by the Payload global:

```txt
globals/MenuSettings.js
```

The global is called:

```txt
menuSettings
```

It contains:

- `currentWeek`: either `A` or `B`
- `anchorDate`: date used as the reference point for week calculation
- `weekADishes`: exactly 5 dishes
- `weekBDishes`: exactly 5 dishes

### How the Two-Week Menu Works

The project uses an alternating A/B week system.

The API route:

```txt
app/api/menu/route.js
```

does this:

1. Loads `menuSettings` from Payload.
2. Finds the Monday of the `anchorDate`.
3. Finds the Monday of the current week.
4. Calculates how many weeks have passed.
5. Decides whether this week is A or B.
6. Returns:
   - `effectiveWeek`
   - `weeksSince`
   - `thisWeeksMenu`
   - `nextWeeksMenu`
   - `todaysDish`

### Important Menu Rules

- Week A must contain exactly 5 dishes.
- Week B must contain exactly 5 dishes.
- The order matters:
  - item 1 is Monday
  - item 2 is Tuesday
  - item 3 is Wednesday
  - item 4 is Thursday
  - item 5 is Friday
- Weekends return no `todaysDish`.

### How to Change the Menu Without Code

1. Go to `/admin`.
2. Open **Menu Settings**.
3. Set `Current Week (A/B)` if needed.
4. Update the dishes in Week A or Week B.
5. Make sure each week has exactly 5 dishes.
6. Save.

### When to Change `anchorDate`

Usually, do not change it.

The `anchorDate` is the reference point for the week alternation calculation. If DNM repeats a week because of holidays or an irregular schedule, it is usually safer to switch `Current Week (A/B)` instead of changing the anchor date.

Only change `anchorDate` if you intentionally want to redefine the whole A/B calendar.

## Voting System

The voting page is:

```txt
app/(frontend)/vote/page.jsx
```

The vote submission API is:

```txt
app/api/vote/route.js
```

### User Flow

1. The vote page fetches `/api/menu`.
2. It uses `todaysDish` as the default selected dish.
3. The student can choose a different dish from this week or next week.
4. The student submits ratings from 1 to 10.
5. The API saves the vote to Payload.
6. If the same browser already voted today, the existing vote is updated instead of creating a duplicate.

### Ratings Stored

- `satisfaction`
- `tastiness`
- `fillingness`
- `healthiness`
- `valueForMoney`

### Duplicate Vote Handling

The app uses an HTTP-only cookie named:

```txt
voterId
```

The cookie lasts 180 days.

When someone votes, the API checks whether the same `voterId` already has a vote between the start and end of the current day. If yes, it updates that vote.

This is not intended to be high-security fraud prevention. It is a practical fairness mechanism for a student canteen feedback tool.

## Catering System

The catering page is:

```txt
app/(frontend)/catering/page.jsx
```

The quote form component is:

```txt
components/Catering/CateringQuoteForm.jsx
```

The API route is:

```txt
app/api/catering/route.js
```

### User Flow

1. Visitor fills out the catering form.
2. The frontend sends a POST request to `/api/catering`.
3. The API creates a `cateringRequests` entry in Payload.
4. The API sends an email to:

```txt
catering@denieuwemensa.nl
```

5. The visitor is redirected to `/catering/request-success`.

### Dish Lookup by Event Date

The catering form can check what dish is scheduled for a selected date.

This uses:

```txt
app/api/dish-on-date/route.js
```

The route accepts:

```txt
GET /api/dish-on-date?date=YYYY-MM-DD
```

If the date is on a weekend, it returns an error because DNM does not serve a weekday menu item on weekends.

## Transparency Dashboards

The transparency page is:

```txt
app/(frontend)/transparency/page.jsx
```

It uses components in:

```txt
components/Transparency/
```

Main chart components:

- `PieChart.jsx`
- `SalesChart.jsx`
- `ProgressionChart.jsx`
- `ComparisonChart.jsx`

### Sales Chart

Frontend component:

```txt
components/Transparency/SalesChart.jsx
```

API route:

```txt
app/api/sales/route.js
```

Data source:

```txt
sales_entries
```

The route supports grouping by:

- `day`
- `week`
- `month`

### Vote Progression Chart

Frontend component:

```txt
components/Transparency/ProgressionChart.jsx
```

API route:

```txt
app/api/vote-stats/by-month/route.js
```

Data source:

```txt
votes
```

Supports:

- date ranges
- rubric selection
- optional dish filtering
- grouping by day or month

### Dish Comparison Chart

Frontend component:

```txt
components/Transparency/ComparisonChart.jsx
```

API route:

```txt
app/api/vote-stats/by-dish/route.js
```

Data source:

```txt
votes
```

## Styling and Design System

Global styles live in:

```txt
app/(frontend)/globals.css
```

The project uses Tailwind CSS 4 with CSS-first theme configuration.

### Brand Colors

The custom DNM color tokens are defined in `@theme`:

```css
--color-dnm-black
--color-dnm-dark-green
--color-dnm-light-green
--color-dnm-white
--color-dnm-gray
```

Use these through Tailwind classes:

```jsx
<div className="bg-dnm-light-green text-dnm-black" />
```

### Typography

The frontend layout loads:

- Local Garet font files from `public/font`
- Montserrat from Google Fonts

The local font is defined in:

```txt
app/(frontend)/layout.jsx
```

### Fluid Type Scale

The CSS defines several fluid type scales:

- `text-step-*`
- `text-mobile-step-*`
- `text-test-step-*`

These are used heavily in page headings and responsive layouts.

### UI Components

Shared UI primitives live in:

```txt
components/ui/
```

The project uses a shadcn-style setup configured in:

```txt
components.json
```

Aliases:

```txt
@/components
@/components/ui
@/lib
@/lib/utils
```

## Common Maintenance Tasks

### Change Homepage Text

Start here:

```txt
app/(frontend)/page.jsx
```

The homepage is made from several components:

```txt
components/LandingPage/ValuesSection.jsx
components/LandingPage/MenuSection.jsx
components/LandingPage/HireUs.jsx
components/FloatingImageGallery.jsx
components/StickyCards.jsx
```

Use the component names to find the section you need.

### Change Navbar Links

Start here:

```txt
components/General/Navbar.jsx
```

### Change Footer Content

Start here:

```txt
components/General/StickyFooter.jsx
```

### Add or Edit a Dish

Prefer using the CMS:

1. Go to `/admin`.
2. Open **Dishes**.
3. Add or edit a dish.
4. Upload an image with proper alt text.
5. Set name, slug, description, ingredients, nutrition, and recipe.
6. Save.

Only edit code if the dish page layout or data model needs to change.

Code files:

```txt
collections/Dishes.js
app/(frontend)/dishes/page.jsx
app/(frontend)/dishes/[slug]/page.jsx
components/Dishes/DishCard.jsx
```

### Publish a Blog Post

Use the CMS:

1. Go to `/admin`.
2. Open **Blog Posts**.
3. Create or edit a post.
4. Add a title, summary, cover image, slug, and rich text body.
5. Check `posted` when ready to publish.
6. Optionally check `featured`.

Relevant code:

```txt
collections/BlogPosts.js
app/(frontend)/blog/page.jsx
app/(frontend)/blog/[slug]/page.jsx
components/Blog/BlogMetaPanel.jsx
```

### Update Board Members or Cooks

Use the CMS:

1. Go to `/admin`.
2. Open **Boards** or **Cooks**.
3. Create a year entry or edit an existing one.
4. Add members and profile pictures.
5. Save.

Relevant code:

```txt
collections/Boards.js
collections/Cooks.js
components/AboutPage/OurTeam.server.jsx
components/AboutPage/OurTeam.jsx
```

### Update Sales Data

Use the CMS:

1. Go to `/admin`.
2. Open **Sales Entries**.
3. Add entries with `date` and `amount`.

Those entries feed the transparency sales chart through:

```txt
app/api/sales/route.js
```

### Change the Voting Questions

This touches both data and UI.

Relevant files:

```txt
collections/Votes.js
app/(frontend)/vote/page.jsx
app/api/vote/route.js
app/api/vote-stats/by-month/route.js
app/api/vote-stats/by-dish/route.js
components/Transparency/ProgressionChart.jsx
components/Transparency/ComparisonChart.jsx
```

If you add a rating field:

1. Add it to the `votes` collection.
2. Add it to the vote page state and form.
3. Validate it in `parseRubricRatings`.
4. Update SQL rubric mappings in chart API routes.
5. Update chart dropdowns/labels if needed.
6. Test voting and transparency charts.

### Change the Price Breakdown Pie Chart

Start here:

```txt
components/Transparency/PieChart.jsx
```

The current pie chart is component-level data, not CMS-driven.

### Change Static Images

Static images are in:

```txt
public/img/
```

Example references:

```jsx
<img src="/img/about/kitchen.jpeg" alt="" />
```

If you replace a file with the same path and name, the code usually does not need to change.

If you add a new file, reference it from `/img/...`.

## Working With Images and Media

There are two kinds of images in this project.

### Static Images

Stored in:

```txt
public/
```

Used for:

- Logos
- Layout images
- Homepage photos
- About page photos
- Catering page photos

Reference path starts at the site root:

```txt
/img/about/kitchen.jpeg
```

### CMS Images

Uploaded through Payload into the `media` collection.

Used for:

- Dish images
- Blog cover images
- Team/profile images
- Testimonial images

Every CMS image needs alt text.

## API Routes

### `GET /api/menu`

File:

```txt
app/api/menu/route.js
```

Returns the current calculated menu.

Example response shape:

```json
{
  "effectiveWeek": "A",
  "weeksSince": 3,
  "thisWeeksMenu": [],
  "nextWeeksMenu": [],
  "todaysDish": {}
}
```

### `GET /api/dish-on-date?date=YYYY-MM-DD`

File:

```txt
app/api/dish-on-date/route.js
```

Returns the dish scheduled for a specific date.

Used by:

- Catering quote form
- Params test page

### `POST /api/vote`

File:

```txt
app/api/vote/route.js
```

Creates or updates a vote.

Expected body:

```json
{
  "dish": "dish-id",
  "remarks": "Optional text",
  "satisfaction": 8,
  "tastiness": 9,
  "fillingness": 7,
  "healthiness": 8,
  "valueForMoney": 9
}
```

### `POST /api/catering`

File:

```txt
app/api/catering/route.js
```

Creates a catering request and sends an email notification.

### `GET /api/sales`

File:

```txt
app/api/sales/route.js
```

Query params:

```txt
dateRange=365
groupBy=month
```

Valid `groupBy` values:

```txt
day
week
month
```

### `GET /api/vote-stats/by-month`

File:

```txt
app/api/vote-stats/by-month/route.js
```

Query params include:

```txt
dateRange
rubrik
dishId
groupBy
```

Note: the query parameter is currently spelled `rubrik` in code. Keep that spelling unless you update all consumers.

### `GET /api/vote-stats/by-dish`

File:

```txt
app/api/vote-stats/by-dish/route.js
```

Returns average ratings grouped by dish.

## Database Notes

Payload manages most database access through its own adapter:

```txt
@payloadcms/db-postgres
```

The custom chart routes use direct SQL through:

```txt
lib/db.js
```

That file creates a shared `pg` pool:

```js
export const pool =
  globalForPg.__pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : false,
  });
```

### Why Direct SQL Is Used for Charts

Payload is convenient for normal CRUD, but chart data needs grouped averages and time buckets. SQL is a better fit for those aggregate queries.

### Table Names

Payload converts collection slugs and field names into database table/column names.

Examples used by the chart routes:

```txt
sales_entries
votes
vote_date
value_for_money
dish_id
```

If you rename Payload collection slugs or fields, check the SQL routes afterward.

## Deployment Notes

The app is designed for Vercel-style deployment.

Before deploying:

1. Ensure `npm run build` passes.
2. Ensure production environment variables are set.
3. Ensure the production database is reachable.
4. Ensure Vercel Blob is configured if media uploads are needed.
5. Ensure Resend is configured if catering emails should send.

### Production Environment Variables

Required:

```bash
DATABASE_URL="postgres://..."
PAYLOAD_SECRET="..."
BLOB_READ_WRITE_TOKEN="..."
RESEND_API_KEY="..."
```

### Post-Deploy Checks

After deploying, check:

- `/` loads
- `/admin` loads
- Login works
- Media upload works
- `/api/menu` returns menu data
- `/vote` can submit a vote
- `/catering` can submit a request
- Catering email is received
- `/transparency` charts load
- `/blog` and `/dishes` load CMS content

## Quality Checks

The latest verified check in this workspace:

```bash
npm run build
```

Result:

```txt
Success. Next.js compiled, checked types, collected page data, and generated 24 app routes.
```

There is currently no dedicated test suite in this repository. For now, the main safety check is the production build plus manual testing of the key workflows.

Recommended manual test checklist after significant changes:

- Load home page.
- Open mobile viewport and check nav.
- Open `/admin`.
- Create or edit a draft CMS item.
- Check `/api/menu`.
- Submit a vote.
- Submit catering form with a test email setup.
- Open `/transparency` and confirm charts render.
- Open a dish page.
- Open a blog post.

## Troubleshooting

### The app cannot connect to the database

Check:

- `DATABASE_URL` exists.
- The database is running.
- The database accepts connections from your environment.
- In production, SSL settings match the database provider.

### `/admin` does not load

Check:

- `PAYLOAD_SECRET` is set.
- `DATABASE_URL` is set.
- The database has been initialized by Payload.
- The build is using `withPayload` in `next.config.mjs`.

### Media upload fails

Check:

- `BLOB_READ_WRITE_TOKEN` is set.
- Vercel Blob is enabled for the project.
- The `media` collection is configured in `payload.config.ts`.

### Catering request is saved but no email arrives

Check:

- `RESEND_API_KEY` is set.
- Resend sender domain/address is configured correctly.
- The receiving address is correct in `app/api/catering/route.js`.
- Payload email adapter config in `payload.config.ts`.

### The wrong dish shows as today's dish

Check:

- `menuSettings.currentWeek`
- `menuSettings.anchorDate`
- Order of dishes in Week A and Week B
- Whether today is a weekend
- `/api/menu` response

### Blog post does not show up

Check:

- `posted` is checked.
- `postedDate` exists.
- The slug is unique.
- The post has required `textBody`.

### Dish page 404-style message appears

Check:

- The dish slug in the URL.
- The dish exists in Payload.
- The dish has a unique slug.

### Transparency charts show no data

Check:

- There are `salesEntries` records for the selected date range.
- There are `votes` records for the selected date range.
- The API route returns data in the browser network tab.
- SQL column names still match the Payload-generated database schema.

## Notes for Future Developers

### Prefer CMS Changes for Content

If the change is content, use Payload first.

Good CMS changes:

- New dish
- New blog post
- Updated team member
- Updated menu
- Updated sales entry
- New image upload

Good code changes:

- New page layout
- New CMS field
- New chart behavior
- New API route
- New component
- Bug fix

### Be Careful With Slugs

Slugs are public URLs. Changing a slug changes the URL.

This affects:

- Blog posts
- Dishes

If a page has already been shared, changing the slug can break old links.

### Be Careful With Payload Field Names

Changing a field name is not just a visual CMS change. It can affect:

- Generated database columns
- API responses
- Frontend components
- SQL chart routes
- Existing production data

When adding fields, prefer additive changes. When renaming fields, plan a migration.

### Keep API and Chart Code in Sync

The transparency charts rely on SQL aliases and response shapes. If you change an API response, update the corresponding chart component at the same time.

### Keep Menu Logic Centralized

The menu calculation currently lives in:

```txt
app/api/menu/route.js
app/api/dish-on-date/route.js
lib/helpers.js
```

If the schedule logic changes, update both menu routes and consider extracting more of the logic into shared helpers to avoid drift.

### Keep Accessibility in Mind

Important existing practices:

- CMS media requires alt text.
- Images should have meaningful alt text when they communicate content.
- Decorative images can use empty alt text.
- Form labels should stay connected to inputs.

### Keep the Build Passing

Before handing changes to someone else:

```bash
npm run build
```

For this project, a passing build is the minimum quality gate.

## Short Architecture Summary

This is a full-stack Next.js app with Payload CMS embedded into the same codebase. Public pages are rendered through the App Router. Operational content is stored in Payload/Postgres. Media is uploaded through Payload and stored in Vercel Blob. Custom route handlers provide menu calculation, voting, catering submissions, and chart data. The frontend uses Tailwind, React components, animation libraries, and Recharts to create a visually expressive but operationally useful site for De Nieuwe Mensa.
