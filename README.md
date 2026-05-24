# Raahi Trail

Raahi Trail is a Next.js 16 travel website for curated group trips and treks across India. The public site lets visitors discover trips, filter upcoming journeys, inspect detailed itineraries, and contact the team through WhatsApp or the contact page. The admin area lets authenticated admins create, update, delete, seed, and manage trip images.

## Tech Stack

- Next.js `16.2.6` with the App Router
- React `19.2.4`
- TypeScript
- Tailwind CSS `4`
- Firebase Admin SDK and Firestore for server-side admin/trip data
- Firebase client SDK is configured in `app/lib/firebase.ts` for browser-side Firebase services if needed
- Cloudinary for uploaded trip images

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

Other scripts:

```bash
npm run build
npm run start
npm run lint
```

## Environment Variables

Create `.env.local` with these keys. Do not commit real credentials.

```env
NEXT_PUBLIC_FIREBASE_WEB_KEY=
NEXT_PUBLIC_FIREBASE_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

ADMIN_REGISTRATION_SECRET_KEY=
ADMIN_SESSION_SECRET=

FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Notes:

- `ADMIN_REGISTRATION_SECRET_KEY` is required to create an admin account and can also authorize trip seeding through the `x-admin-secret` header.
- `ADMIN_SESSION_SECRET` signs the HTTP-only admin session cookie.
- `FIREBASE_ADMIN_PRIVATE_KEY` should preserve newline characters. The app converts escaped `\n` sequences before initializing Firebase Admin.
- Cloudinary credentials are required only for admin image upload/delete flows.

## App Router Structure

This project uses Next.js App Router file conventions. Folders define route segments, `page.tsx` exposes UI routes, `layout.tsx` wraps child routes, and `route.ts` exposes backend route handlers.

The public website lives inside the `(site)` route group. Because route groups do not appear in the URL, `app/(site)/trips/page.tsx` maps to `/trips`, not `/(site)/trips`.

```text
app/
  layout.tsx                 Root HTML/body, fonts, metadata, global CSS
  globals.css                Global Tailwind/theme styles

  (site)/
    layout.tsx               Public shell: Header, Footer, FloatingWhatsApp
    page.tsx                 Home page
    trips/page.tsx           Trip listing page
    trips/TripsPageClient.tsx
    trips/[slug]/page.tsx    Dynamic trip detail page
    about/page.tsx
    contact/page.tsx

  admin/
    layout.tsx               Admin shell and admin navigation
    page.tsx                 Redirects to /admin/dashboard
    login/page.tsx
    login/AdminLoginForm.tsx
    register/page.tsx
    register/AdminRegisterForm.tsx
    dashboard/page.tsx
    dashboard/AdminTripForm.tsx

  api/
    admin/
      login/route.ts
      logout/route.ts
      register/route.ts
      images/route.ts
      trips/route.ts
      trips/[slug]/route.ts
      trips/seed/route.ts

  components/                Shared public-site UI sections
  lib/                       Data, auth, session, Firebase, Cloudinary helpers
```

## Public Routes

| URL | File | Purpose |
| --- | --- | --- |
| `/` | `app/(site)/page.tsx` | Home page. Fetches trips from Firestore through `getTripsFromDb()` and renders the hero, trip sections, community, upcoming departures, testimonials, and image band. |
| `/trips` | `app/(site)/trips/page.tsx` | Server page that fetches trips and passes them to the client filtering UI. |
| `/trips/[slug]` | `app/(site)/trips/[slug]/page.tsx` | Dynamic trip detail page. Uses `generateStaticParams`, dynamic metadata, Firestore fallback data, itinerary, inclusions, gallery, price card, and WhatsApp CTA. |
| `/about` | `app/(site)/about/page.tsx` | Brand story, mission, founder note, values, and trip CTA. |
| `/contact` | `app/(site)/contact/page.tsx` | WhatsApp CTA, contact form markup, phone/email/Instagram links, and embedded map. |

## Admin Routes

| URL | File | Purpose |
| --- | --- | --- |
| `/admin` | `app/admin/page.tsx` | Redirects to `/admin/dashboard`. |
| `/admin/login` | `app/admin/login/page.tsx` | Login screen. `AdminLoginForm` posts credentials to `/api/admin/login`. |
| `/admin/register` | `app/admin/register/page.tsx` | Admin registration screen. Requires username, password, and registration secret. |
| `/admin/dashboard` | `app/admin/dashboard/page.tsx` | Protected dashboard. Reads the signed session cookie, redirects unauthenticated users, fetches trips, and renders the trip management UI. |

Admin sessions are stored in an HTTP-only cookie named `raahi_admin_session`. The cookie contains a signed payload with username and expiry, created and verified in `app/lib/adminSession.ts`.

## Main Components

Public shared components live in `app/components/`:

- `Header.tsx` - fixed site navigation, active route styling, brand image, and trips CTA.
- `Footer.tsx` - public footer.
- `FloatingWhatsApp.tsx` - always-available WhatsApp contact action on public pages.
- `HomeHero.tsx` - first section of the home page.
- `TripsSection.tsx` - home-page trip cards fed by Firestore trips.
- `WhyRaahiSection.tsx` - brand value section.
- `CommunitySection.tsx` - community-focused home section.
- `UpcomingDeparturesSection.tsx` - upcoming trips preview.
- `TestimonialsSection.tsx` - social proof.
- `HomeImageBand.tsx` - visual closing band.

Route-specific client components:

- `app/(site)/trips/TripsPageClient.tsx` handles search, destination, budget, and duration filters on the trips listing page.
- `app/admin/login/AdminLoginForm.tsx` posts login credentials and navigates to the dashboard on success.
- `app/admin/register/AdminRegisterForm.tsx` posts admin registration data and opens a session on success.
- `app/admin/dashboard/AdminTripForm.tsx` exports the admin trip dashboard UI for selecting trips, editing fields, uploading/deleting images, seeding trips, deleting trips, saving trips, and logging out.

## Data Model

The core trip type is defined in `app/lib/trips.ts`.

```ts
type Trip = {
  slug: string;
  title: string;
  region: string;
  destination: string;
  tagline: string;
  image: string;
  imagePublicId?: string;
  durationDays: number;
  durationNights: number;
  groupSize: string;
  date: string;
  price: number;
  originalPrice: number;
  difficulty: string;
  highlights: string[];
  itinerary: Array<{ day: number; title: string; description: string }>;
  included: string[];
  excluded: string[];
  stay: string;
  meetingPoint: string;
  gallery: string[];
  galleryPublicIds?: string[];
};
```

`app/lib/trips.ts` also contains seed trips and `formatCurrency()`. Firestore access is handled in `app/lib/tripsDb.ts`.

Trip documents are stored in the Firestore `trips` collection, using the trip `slug` as the document ID. Admin accounts are stored in the `admins` collection, using normalized lowercase usernames as document IDs.

## Data Flow

Public page flow:

1. A visitor opens `/`, `/trips`, or `/trips/[slug]`.
2. The server component calls `getTripsFromDb()` or `getTripBySlugFromDb()`.
3. `tripsDb.ts` reads the Firestore `trips` collection using Firebase Admin.
4. If Firestore is empty or a specific slug is missing, the app falls back to seed data from `app/lib/trips.ts`.
5. Trip data is normalized before rendering so missing or invalid fields do not break the UI.

Admin auth flow:

1. `/admin/register` posts `{ username, password, secretKey }` to `/api/admin/register`.
2. The API checks `secretKey` against `ADMIN_REGISTRATION_SECRET_KEY`.
3. `registerAdmin()` hashes the password with `scrypt` and stores the admin in Firestore.
4. `createAdminSession()` signs a session token and sets the HTTP-only cookie.
5. `/admin/login` posts credentials to `/api/admin/login`.
6. `verifyAdminLogin()` checks the password hash and updates `lastLoginAt`.
7. Protected admin APIs call `getAdminSession()` before reading or mutating data.

Admin trip management flow:

1. `/admin/dashboard` verifies the admin session on the server.
2. It fetches trips with `getTripsFromDb()` and passes them into the client dashboard.
3. Saving a trip posts `{ trip, previousSlug }` to `/api/admin/trips`.
4. The route handler writes the trip to Firestore with `saveTripToDb()`.
5. If a slug changed, the old Firestore document is deleted in the same batch.
6. Removed Cloudinary image IDs are deleted after the trip save.
7. `revalidatePath()` refreshes `/`, `/trips`, and relevant `/trips/[slug]` pages.

Image flow:

1. The admin selects an image in the dashboard.
2. The dashboard posts `FormData` to `/api/admin/images` with `file`, `kind`, and `slug`.
3. The API verifies the admin session.
4. `uploadCloudinaryImage()` signs Cloudinary params and uploads to `raahi-trail/trips/{slug}/{kind}`.
5. The API returns `{ url, publicId }`.
6. The dashboard stores the returned URL and public ID in the trip draft.
7. When images are removed or replaced, `/api/admin/images` `DELETE` destroys the Cloudinary asset by `publicId`.

## API Routes

All backend endpoints are Next.js route handlers under `app/api`. They run with `runtime = "nodejs"` because they use Firebase Admin, Node crypto, cookies, and Cloudinary signing.

| Method | Endpoint | Auth | Request | Response | Details |
| --- | --- | --- | --- | --- | --- |
| `POST` | `/api/admin/register` | Registration secret | JSON `{ username, password, secretKey }` | `{ username }` or `{ error }` | Validates required fields, enforces password length >= 8, verifies `ADMIN_REGISTRATION_SECRET_KEY`, stores hashed admin, and creates a session cookie. |
| `POST` | `/api/admin/login` | Username/password | JSON `{ username, password }` | `{ username }` or `{ error }` | Verifies credentials against Firestore and creates a signed session cookie. |
| `POST` | `/api/admin/logout` | Session cookie | none | `{ ok: true }` | Clears the admin session cookie. |
| `GET` | `/api/admin/trips` | Session cookie | none | `{ trips }` or `{ error }` | Returns normalized trips from Firestore, falling back to seed trips when the collection is empty. |
| `POST` | `/api/admin/trips` | Session cookie | JSON `{ trip, previousSlug? }` | `{ trip }` or `{ error }` | Creates or updates a trip in Firestore, deletes old slug doc when needed, removes unused Cloudinary images, and revalidates public pages. |
| `DELETE` | `/api/admin/trips/[slug]` | Session cookie | URL slug | `{ ok: true }` or `{ error }` | Deletes a trip document and its Cloudinary images, then revalidates public pages. |
| `POST` | `/api/admin/trips/seed` | Session cookie or `x-admin-secret` | Optional `x-admin-secret` header | `{ trips }` or `{ error }` | Writes all seed trips from `app/lib/trips.ts` into Firestore and revalidates public listing pages. |
| `POST` | `/api/admin/images` | Session cookie | `multipart/form-data` with `file`, `kind`, `slug` | `{ url, publicId }` or `{ error }` | Uploads an image to Cloudinary and returns the secure URL/public ID. |
| `DELETE` | `/api/admin/images` | Session cookie | JSON `{ publicId }` | `{ ok: true }` or `{ error }` | Deletes one Cloudinary image by public ID. |

## Library Files

- `app/lib/trips.ts` - Trip type, seed data, trip helpers, and INR formatter.
- `app/lib/tripsDb.ts` - Firestore CRUD, seed import, normalization, and Cloudinary cleanup after trip mutations.
- `app/lib/adminAuth.ts` - Admin registration and login verification.
- `app/lib/adminSession.ts` - Signed HTTP-only cookie session creation, verification, and clearing.
- `app/lib/password.ts` - Password hashing and verification using Node `crypto.scrypt`.
- `app/lib/firebaseAdmin.ts` - Firebase Admin app initialization and Firestore access.
- `app/lib/firebase.ts` - Browser Firebase app, Auth, Firestore, Storage, and Analytics helpers.
- `app/lib/cloudinary.ts` - Signed Cloudinary upload and destroy requests.

## Styling and Assets

- Global styles and Tailwind theme tokens are in `app/globals.css`.
- Font variables are configured in `app/layout.tsx` using `DM_Sans`, `Outfit`, and `Geist_Mono`.
- Remote images are allowed in `next.config.ts` from:
  - `images.unsplash.com`
  - `images.pexels.com`
  - `customer-assets.emergentagent.com`
  - `res.cloudinary.com`
- Static assets live in `public/`.

## Page Rendering Notes

- Public trip data is read from server components, then selected pages hand data to client components for interactivity.
- `/trips/[slug]` uses `generateStaticParams()` from the current trip data and `generateMetadata()` for trip-specific titles/descriptions.
- Backend route handlers do not participate in layouts or client-side navigation.
- Admin mutations call `revalidatePath()` so edited trips appear on public pages after changes.

## Common Workflows

Register first admin:

1. Set `ADMIN_REGISTRATION_SECRET_KEY` and Firebase Admin credentials in `.env.local`.
2. Start the app with `npm run dev`.
3. Open `/admin/register`.
4. Enter username, password, and the registration secret.
5. On success, the app creates the admin record and signs you into `/admin/dashboard`.

Seed trips into Firestore:

1. Log in as an admin.
2. Open `/admin/dashboard`.
3. Click `Reset`.
4. The dashboard calls `/api/admin/trips/seed` and stores all seed trips in Firestore.

Create or edit a trip:

1. Open `/admin/dashboard`.
2. Select an existing trip or click `Add trip`.
3. Fill public trip fields, itinerary, inclusions, exclusions, and gallery.
4. Upload card/gallery images if needed.
5. Click `Save`.
6. The app writes to Firestore, cleans up removed Cloudinary images, and revalidates public pages.

Delete a trip:

1. Open `/admin/dashboard`.
2. Click `Delete` on a trip card.
3. The API removes the Firestore document and associated Cloudinary images.

## Important Implementation Details

- Firestore fallback behavior keeps the public site populated from seed data when the `trips` collection is empty.
- Trip slugs are the stable IDs for Firestore docs and public detail URLs.
- Admin usernames are normalized to lowercase before being stored or verified.
- Session signatures use HMAC SHA-256 and `timingSafeEqual`.
- Password hashes are stored as `scrypt:{salt}:{hash}`.
- Cloudinary image cleanup is tied to stored `imagePublicId` and `galleryPublicIds`.
- Contact forms currently render frontend form fields only; there is no contact form API route yet.
