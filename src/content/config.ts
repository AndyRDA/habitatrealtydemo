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
      isAddressShown: z.boolean(), // Boolean from YAML
      listingNumber: z.string().uuid(), // String/UUID from YAML
      price: z.number(), // Number from YAML (was z.string() in old config)
      agent: z.string(),
      // Zod utility to convert date string (saved by CMS) into a Date object
      pubDate: z.coerce.date(), 

      // --- Property Metrics and Characteristics (Mirroring YAML Number/Select fields) ---
      propertyType: z.enum(['House', 'Town House', 'Apartment / Flat', 'Commercial', 'Industrial', 'Farm', 'Land']), // Select field resolves to Zod Enum
      bedrooms: z.number(),
      bathrooms: z.number(),
      garages: z.number(),
      parking: z.number(),
      erfSize: z.number(),
      floorSize: z.number(),
      isStandalone: z.boolean(), // Boolean from YAML

      // --- Property Features (Mirroring YAML Boolean fields) ---
      hasPool: z.boolean(),
      hasGarden: z.boolean(),
      hasFibre: z.boolean(),
      hasSolar: z.boolean(),
      hasBackupPower: z.boolean(),
      hasADU: z.boolean(),

      // --- Description and Media ---
      // Rich-text/Markdown content is accessed separately in Astro, but the frontmatter field for the description is often the 'body'. 
      // Assuming 'body' holds additional frontmatter text/metadata if you are not using the main content body.
      // If the rich-text content is intended to be the main Markdown body, you can omit 'body' from the schema.
      body: z.string(), 

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
      address: z.string(),
      location: z.string(),
      city: z.string(),
      isAddressShown: z.boolean(),
      pubDate: z.coerce.date(),
      agent: z.string(),

      // Rental-Specific Terms
      occupationDate: z.coerce.date(),
      leasePeriod: z.enum(['1 Month', '6 Months', '12 Months', '24 Months']),
      depositRequirements: z.string(),

      // Property Metrics and Status
      propertyType: z.enum(['House', 'Town House', 'Apartment / Flat', 'Commercial', 'Industrial', 'Farm', 'Land']),
      bedrooms: z.number(),
      bathrooms: z.number(),
      garages: z.number(),
      parking: z.number(),
      erfSize: z.number(),
      floorSize: z.number(),
      petsAllowed: z.boolean(),
      furnishedStatus: z.enum(['Furnished', 'Unfurnished']),

      // Property Features
      hasPool: z.boolean(),
      hasGarden: z.boolean(),
      hasFibre: z.boolean(),
      hasSolar: z.boolean(),
      hasBackupPower: z.boolean(),

      // Description and Media
      body: z.string(),

      mainImage: z.object({
        url: image(),
        alt: z.string(),
      }),
      
      aboutImages: z.array(
        z.object({
          url: image(),
          alt: z.string(),
        })
      ),
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
    }),
});

export const collections = {
  agents,
  sale,
  rentals,
  posts: postsCollection,
  infopages,
};
