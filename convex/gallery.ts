import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getGallery = query({
    args: {},
    handler: async (ctx) => {
        const images = await ctx.db.query("gallery").order("desc").collect();
        return await Promise.all(
            images.map(async (image) => ({
                ...image,
                url: image.storageId ? (await ctx.storage.getUrl(image.storageId)) || image.url : image.url,
            }))
        );
    },
});

export const saveImage = mutation({
    args: {
        title: v.string(),
        url: v.string(),
        storageId: v.optional(v.string()),
        description: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("gallery", {
            title: args.title,
            url: args.url,
            storageId: args.storageId,
            description: args.description,
            createdAt: Date.now(),
        });
    },
});

export const deleteImage = mutation({
    args: { id: v.id("gallery") },
    handler: async (ctx, args) => {
        return await ctx.db.delete(args.id);
    },
});

export const generateUploadUrl = mutation({
    args: {},
    handler: async (ctx) => {
        return await ctx.storage.generateUploadUrl();
    },
});
