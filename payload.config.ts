import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { resendAdapter } from "@payloadcms/email-resend";

import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Testimonials } from "./collections/Testimonials";
import { Boards } from "./collections/Boards";
import { Cooks } from "./collections/Cooks";
import { Dishes } from "./collections/Dishes";
import { Votes } from "./collections/Votes";
import { CateringRequests } from "./collections/CateringRequests";
import { BlogPosts } from "./collections/BlogPosts";

import { MenuSettings } from "./globals/MenuSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  email: resendAdapter({
    defaultFromAddress: "bot@denieuwemensa.nl",
    defaultFromName: "DNM BOT",
    apiKey: process.env.RESEND_API_KEY || "",
  }),
  collections: [
    Users,
    Media,
    Testimonials,
    Boards,
    Cooks,
    Dishes,
    Votes,
    CateringRequests,
    BlogPosts,
  ],
  globals: [MenuSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true, // Optional, defaults to true
      // Specify which collections should use Vercel Blob
      collections: {
        media: true,
      },
      // Token provided by Vercel once Blob storage is added to your Vercel project
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
});
