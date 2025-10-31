import { defineCollection, z } from "astro:content";

const agents = defineCollection({
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			role: z.string(),
			intro: z.string(),
			phone: z.number(),
			email: z.string(),
			languages: z.string().array(),
			propertiesSold: z.number(),
			marketTime: z.string(),
			maxSale: z.number(),
			areaServed: z.string().array(),
			office: z.string(),
			officeAddress: z.string(),
			avatar: image(),
			avatarLg: image(),
			gallery: z.array(image()).optional(),
		}),
});

const infopages = defineCollection({
	schema: z.object({
		page: z.string(),
		pubDate: z.date(),
		body: z.string().optional(),
	}),
});

const sale = defineCollection({
	schema: ({ image }) =>
		z.object({
			// --- Core Listing Information ---
			projectName: z.string(),
			isLive: z.boolean(),
			status: z.enum(["For Sale", "Under Offer", "Sold", "Reduced"]),
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
			propertyType: z.enum([
				"House",
				"Town House",
				"Apartment / Flat",
				"Commercial",
				"Industrial",
				"Farm",
				"Land",
			]).optional(), // Select field resolves to Zod Enum
			levies: z.number().optional(),
			zoning: z.string().optional(),
			// propertyType: z.string(),
			bedrooms: z.number().optional(),
			// bedrooms: z.string(),
			bathrooms: z.number().optional(),
			// bathrooms: z.string(),
			garages: z.number().optional(),
			// garages: z.string(),
			parking: z.number().optional(),
			// parking: z.string(),
			erfSize: z.number().optional(),
			// erfSize: z.string(),
			floorSize: z.number().optional(),
			// floorSize: z.string(),
			isStandalone: z.boolean().optional(),
			// isStandalone: z.string(),

			// --- Property Features (Mirroring YAML Boolean fields) ---
			hasPool: z.boolean().optional(),
			// hasPool: z.string(),
			hasGarden: z.boolean().optional(),
			// hasGarden: z.string(),
			hasFibre: z.boolean().optional(),
			// hasFibre: z.string(),
			hasSolar: z.boolean().optional(),
			// hasSolar: z.string(),
			hasBackupPower: z.boolean().optional(),
			// hasBackupPower: z.string(),
			hasADU: z.boolean().optional(),
			// hasADU: z.string(),

			// --- Description and Media ---
			// Rich-text/Markdown content is accessed separately in Astro, but the frontmatter field for the description is often the 'body'.
			// Assuming 'body' holds additional frontmatter text/metadata if you are not using the main content body.
			// If the rich-text content is intended to be the main Markdown body, you can omit 'body' from the schema.
			// body: z.string().optional(),
			descTitle: z.string().optional(),

			// Image fields, matching the URL/Alt structure
			mainImage: image(),

			// List field structure (for repeatable images)
			aboutImages: z.array(image()).optional(),
		}),
});

const rentals = defineCollection({
	schema: ({ image }) =>
		z.object({
			// Core Listing Information
			projectName: z.string(),
			isLive: z.boolean(),
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
			occupationDate: z.coerce.date().optional(),
			leasePeriod: z.enum(["1 Month", "6 Months", "12 Months", "24 Months"]).optional(),
			// leasePeriod: z.string(),
			depositRequirements: z.string().optional(),
			levies: z.number().optional(),
			zoning: z.string().optional(),
			// Property Metrics and Status
			propertyType: z.enum([
				"House",
				"Town House",
				"Apartment / Flat",
				"Commercial",
				"Industrial",
				"Farm",
				"Land",
			]).optional(),
			// propertyType: z.string(),
			bedrooms: z.number().optional(),
			// bedrooms: z.string(),
			bathrooms: z.number().optional(),
			// bathrooms: z.string(),
			garages: z.number().optional(),
			// garages: z.string(),
			parking: z.number().optional(),
			// parking: z.string(),
			erfSize: z.number().optional(),
			// erfSize: z.string(),
			floorSize: z.number().optional(),
			// floorSize: z.string(),
			petsAllowed: z.boolean().optional(),
			// petsAllowed: z.string(),
			furnishedStatus: z.enum(["Furnished", "Unfurnished"]).optional(),
			// furnishedStatus: z.string(),

			// Property Features
			hasPool: z.boolean().optional(),
			// hasPool: z.string(),
			hasGarden: z.boolean().optional(),
			// hasGarden: z.string(),
			hasFibre: z.boolean().optional(),
			// hasFibre: z.string(),
			hasSolar: z.boolean().optional(),
			// hasSolar: z.string(),
			hasBackupPower: z.boolean().optional(),
			// hasBackupPower: z.string(),

			// Description and Media
			// body: z.string().optional(),
			descTitle: z.string().optional(),
			// descBody: z.string(),
			mainImage: image(),

			aboutImages: z.array(image()).optional(),
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
			body: z.string().optional(),
		}),
});

export const collections = {
	agents,
	sale,
	rentals,
	posts: postsCollection,
	infopages,
};
