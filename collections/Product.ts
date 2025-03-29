import { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "price"],
  },
  access: {
    read: () => true, // Everyone can read products
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Product Name",
    },
    {
      name: "description",
      type: "textarea", // Simple textarea instead of richText
      label: "Product Description",
    },
    {
      name: "price",
      type: "number",
      required: true,
      min: 0,
      admin: {
        description: "Price in USD",
      },
    },
  ],
};
