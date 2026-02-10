import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getServices = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("services").filter(q => q.eq(q.field("active"), true)).collect();
    },
});

export const getAllServices = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("services").collect();
    },
});

export const saveService = mutation({
    args: {
        id: v.optional(v.id("services")),
        name: v.string(),
        price: v.number(),
        duration: v.string(),
        description: v.optional(v.string()),
        active: v.boolean(),
    },
    handler: async (ctx, args) => {
        if (args.id) {
            return await ctx.db.patch(args.id, {
                name: args.name,
                price: args.price,
                duration: args.duration,
                description: args.description,
                active: args.active,
            });
        } else {
            return await ctx.db.insert("services", {
                name: args.name,
                price: args.price,
                duration: args.duration,
                description: args.description,
                active: args.active,
            });
        }
    },
});

export const toggleServiceStatus = mutation({
    args: { id: v.id("services"), active: v.boolean() },
    handler: async (ctx, args) => {
        return await ctx.db.patch(args.id, { active: args.active });
    }
});

// Helper to init services (can be called once)
export const initServices = mutation({
    args: {},
    handler: async (ctx) => {
        const existing = await ctx.db.query("services").first();
        if (existing) return "Services already initialized";

        const SERVICES = [
            { name: 'Corte Masculino', price: 35.00, duration: '30 min', description: 'Corte tradicional masculino com acabamento profissional.' },
            { name: 'Barba', price: 25.00, duration: '20 min', description: 'Modelagem e aparagem de barba com toalha quente.' },
            { name: 'Sobrancelha', price: 10.00, duration: '10 min', description: 'Design e aparagem de sobrancelhas masculinas.' },
            { name: 'Bigode', price: 5.00, duration: '10 min', description: 'Aparagem e modelagem de bigode.' },
            { name: 'Pezinho', price: 15.00, duration: '10 min', description: 'Acabamento na nuca e contorno.' },
            { name: 'Penteado', price: 25.00, duration: '20 min', description: 'Penteado para eventos e ocasiões especiais.' },
            { name: 'Alisante', price: 30.00, duration: '45 min', description: 'Tratamento de alisamento capilar.' },
            { name: 'Progressiva', price: 70.00, duration: '90 min', description: 'Escova progressiva para cabelos lisos e alinhados.' },
            { name: 'Botox', price: 60.00, duration: '60 min', description: 'Tratamento de botox capilar para hidratação profunda.' },
            { name: 'Luzes', price: 70.00, duration: '90 min', description: 'Mechas e luzes para um visual moderno.' },
            { name: 'Platinado', price: 130.00, duration: '120 min', description: 'Descoloração completa para cabelo platinado.' },
            { name: 'Hidratação', price: 20.00, duration: '30 min', description: 'Tratamento de hidratação para cabelos saudáveis.' },
            { name: 'Pigmentação', price: 20.00, duration: '30 min', description: 'Pigmentação capilar para cobertura de fios brancos.' }
        ];

        for (const s of SERVICES) {
            await ctx.db.insert("services", { ...s, active: true });
        }
        return "Services initialized";
    }
});
