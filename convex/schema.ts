import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    appointments: defineTable({
        clientName: v.string(),
        phone: v.optional(v.string()),
        serviceId: v.string(),
        serviceName: v.string(),
        servicePrice: v.string(),
        date: v.string(), // Format: YYYY-MM-DD
        time: v.string(), // Format: HH:MM
        userId: v.string(), // Clerk Subject (User ID)
        paymentStatus: v.string(), // "pending" | "paid"
        status: v.optional(v.string()), // "pending" | "completed" | "cancelled"
        createdAt: v.number(),
    })
        .index("by_date", ["date"])
        .index("by_user", ["userId"]),
    reviews: defineTable({
        clientName: v.string(),
        rating: v.number(),
        content: v.string(),
        createdAt: v.number(),
    }).index("by_date", ["createdAt"]),
    gallery: defineTable({
        title: v.string(),
        url: v.string(),
        storageId: v.optional(v.string()), // To store the storage ID if we use Convex file storage
        description: v.optional(v.string()),
        createdAt: v.number(),
    }).index("by_date", ["createdAt"]),
    services: defineTable({
        name: v.string(),
        price: v.number(), // Storing as number for calculations. But frontend uses string "R$ XX". I should store as number.
        duration: v.string(), // "30 min"
        description: v.optional(v.string()),
        active: v.boolean(),
        order: v.optional(v.number()),
    }).index("by_active", ["active"]),
});
