// storage-adapter-import-placeholder
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import { Users } from "@/collections/Users";
import { Media } from "@/collections/Media";
import { Categories } from "@/collections/Categories";
import { Products } from "./collections/products";
import { Tags } from "./collections/tags";
import { Tenants } from "./collections/Tenants";
import { multiTenantPlugin } from "@payloadcms/plugin-multi-tenant";
import { Orders } from "./collections/Orders";
import { Reviews } from "./collections/Reviews";
import { isSuperAdmin } from "./lib/access";

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
    components: {
      beforeNavLinks: ["@/components/stripe-verify#StripeVerify"],
    },
  },

  collections: [
    Users,
    Media,
    Categories,
    Products,
    Tags,
    Tenants,
    Orders,
    Reviews,
  ],
  editor: lexicalEditor(),
  secret: PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: DATABASE_URI,
    connectOptions: {
      serverSelectionTimeoutMS: 300000, // Increase to 30 seconds
      socketTimeoutMS: 750000,
    },
  }),
  plugins: [
    multiTenantPlugin({
      collections: {
        products: {},
      },
      tenantsArrayField: {
        includeDefaultField: false,
      },
      userHasAccessToAllTenants: (user) => isSuperAdmin(user),
    }),
    // storage-adapter-placeholder
  ],
});
