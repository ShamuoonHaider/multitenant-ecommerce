import type { CollectionConfig } from "payload";

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "user",
      relationTo: "users",
      hasMany: false,
      type: "relationship",
      required: true,
    },
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      hasMany: false,
      required: true,
    },
    {
      name: "stripeCheckoutSessionId",
      type: "text",
      required: true,
    },
  ],
};
