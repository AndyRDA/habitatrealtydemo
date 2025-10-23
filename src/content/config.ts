import { defineCollection, z } from "astro:content";

const agents = defineCollection({
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      intro: z.string(),
      contact: z.array(z.object({ item: z.string() })),
      languages: z.array(z.object({ item: z.string() })),
      stats: z.array(z.object({ key: z.string(), value: z.string() })),
      images: z.array(
        z.object({
          url: image(), // ✅ image()
          alt: z.string(),
        })
      ),
      office: z.string(),
      officeAddress: z.string(),
      avatar: z.object({
        url: image(), // ✅ image()
        alt: z.string(),
      }),
    }),
});

const infopages = defineCollection({
  schema: z.object({
    page: z.string(),
    pubDate: z.date(),
    body: z.string().optional()
  }),
});

const sale = defineCollection({
  schema: ({ image }) =>
    z.object({
      // --- Core Listing Information ---
      projectName: z.string(),
      title: z.string(),
      address: z.string(),
      location: z.string(),
      city: z.string(),
      isAddressShown: z.boolean(),
      // isAddressShown: z.string(),
      listingNumber: z.string().uuid(), // String/UUID from YAML
      price: z.number(),
      // price: z.string(),
      agent: z.string(),
      // Zod utility to convert date string (saved by CMS) into a Date object
      pubDate: z.coerce.date(), 

      // --- Property Metrics and Characteristics (Mirroring YAML Number/Select fields) ---
      propertyType: z.enum(['House', 'Town House', 'Apartment / Flat', 'Commercial', 'Industrial', 'Farm', 'Land']), // Select field resolves to Zod Enum
      // propertyType: z.string(),
      bedrooms: z.number(),
      // bedrooms: z.string(),
      bathrooms: z.number(),
      // bathrooms: z.string(),
      garages: z.number(),
      // garages: z.string(),
      parking: z.number(),
      // parking: z.string(),
      erfSize: z.number(),
      // erfSize: z.string(),
      floorSize: z.number(),
      // floorSize: z.string(),
      isStandalone: z.boolean(),
      // isStandalone: z.string(),

      // --- Property Features (Mirroring YAML Boolean fields) ---
      hasPool: z.boolean(),
      // hasPool: z.string(),
      hasGarden: z.boolean(),
      // hasGarden: z.string(),
      hasFibre: z.boolean(),
      // hasFibre: z.string(),
      hasSolar: z.boolean(),
      // hasSolar: z.string(),
      hasBackupPower: z.boolean(),
      // hasBackupPower: z.string(),
      hasADU: z.boolean(),
      // hasADU: z.string(),

      // --- Description and Media ---
      // Rich-text/Markdown content is accessed separately in Astro, but the frontmatter field for the description is often the 'body'. 
      // Assuming 'body' holds additional frontmatter text/metadata if you are not using the main content body.
      // If the rich-text content is intended to be the main Markdown body, you can omit 'body' from the schema.
      body: z.string().optional(), 

      // Image fields, matching the URL/Alt structure
      mainImage: z.object({
        url: image(),
        alt: z.string(),
      }),
      // List field structure (for repeatable images)
      aboutImages: z.array(
        z.object({
          url: image(),
          alt: z.string(),
        })
      ),

    }),
});

const rentals = defineCollection({
  schema: ({ image }) =>
    z.object({
      // Core Listing Information
      projectName: z.string(),
      listingNumber: z.string().uuid(),
      price: z.number(),
      // price: z.string(),
      address: z.string(),
      location: z.string(),
      city: z.string(),
      isAddressShown: z.boolean(),
      // isAddressShown: z.string(),
      pubDate: z.coerce.date(),
      agent: z.string(),

      // Rental-Specific Terms
      occupationDate: z.coerce.date(),
      leasePeriod: z.enum(['1 Month', '6 Months', '12 Months', '24 Months']),
      // leasePeriod: z.string(),
      depositRequirements: z.string(),

      // Property Metrics and Status
      propertyType: z.enum(['House', 'Town House', 'Apartment / Flat', 'Commercial', 'Industrial', 'Farm', 'Land']),
      // propertyType: z.string(),
      bedrooms: z.number(),
      // bedrooms: z.string(),
      bathrooms: z.number(),
      // bathrooms: z.string(),
      garages: z.number(),
      // garages: z.string(),
      parking: z.number(),
      // parking: z.string(),
      erfSize: z.number(),
      // erfSize: z.string(),
      floorSize: z.number().optional(),
      // floorSize: z.string(),
      petsAllowed: z.boolean(),
      // petsAllowed: z.string(),
      furnishedStatus: z.enum(['Furnished', 'Unfurnished']),
      // furnishedStatus: z.string(),

      // Property Features
      hasPool: z.boolean(),
      // hasPool: z.string(),
      hasGarden: z.boolean(),
      // hasGarden: z.string(),
      hasFibre: z.boolean(),
      // hasFibre: z.string(),
      hasSolar: z.boolean(),
      // hasSolar: z.string(),
      hasBackupPower: z.boolean(),
      // hasBackupPower: z.string(),

      // Description and Media
      body: z.string().optional(),

      mainImage: image(),
      
      aboutImages: z.array(
        image()
      )
    }),
});

const postsCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      author: z.string(),
      image: z.object({
        url: image(), // ✅ image()
        alt: z.string(),
      }),
      avatar: z.object({
        url: image(), // ✅ image()
        alt: z.string(),
      }),
      tags: z.array(z.string()),
      body: z.string().optional()
    }),
});

export const collections = {
  agents,
  sale,
  rentals,
  posts: postsCollection,
  infopages,
};
