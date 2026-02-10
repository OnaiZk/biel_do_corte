
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new review
export const createReview = mutation({
    args: {
        clientName: v.string(),
        rating: v.number(),
        content: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("reviews", {
            clientName: args.clientName,
            rating: args.rating,
            content: args.content,
            createdAt: Date.now(),
        });
    },
});

// Get all reviews
export const getReviews = query({
    args: {},
    handler: async (ctx) => {
        const reviews = await ctx.db
            .query("reviews")
            .withIndex("by_date")
            .order("desc")
            .collect();
        return reviews;
    },
});
