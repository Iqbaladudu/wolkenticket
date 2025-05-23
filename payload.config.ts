// storage-adapter-import-placeholder
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig, getPayload } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { BookingsCollection } from "./collections/Booking";
import { Products } from "./collections/Product";

import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { NextResponse } from "next/server";
import { Dam } from "lucide-react";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, BookingsCollection, Products],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    formBuilderPlugin({
      formOverrides: {
        access: {
          read: () => true,
        },
      },
      fields: {
        text: true,
        textarea: true,
        select: true,
        email: true,
        state: true,
        country: true,
        checkbox: true,
        number: true,
        message: true,
        payment: false,
      },
    }),
    // storage-adapter-placeholder
  ],
  email: nodemailerAdapter({
    defaultFromAddress: "support@wolkenticket.com",
    defaultFromName: "Wolkenticket Support",
    skipVerify: true,
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    },
  }),
});
