// storage-adapter-import-placeholder
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Categories } from "./collections/Categories";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Validate required environment variables at startup to fail fast and avoid
// passing empty strings into the Payload/mongoose configuration.
const PAYLOAD_SECRET = process.env.PAYLOAD_SECRET;
if (!PAYLOAD_SECRET) {
  throw new Error(
    "PAYLOAD_SECRET environment variable is required for Payload to start."
  );
}

const DATABASE_URI = process.env.DATABASE_URI;
if (!DATABASE_URI) {
  throw new Error(
    "DATABASE_URI environment variable is required to connect to the database."
  );
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Categories],
  editor: lexicalEditor(),
  secret: PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: DATABASE_URI,
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
});
