import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new appointment
export const createAppointment = mutation({
    args: {
        clientName: v.string(),
        phone: v.optional(v.string()),
        serviceId: v.string(),
        serviceName: v.string(),
        servicePrice: v.string(),
        date: v.string(),
        time: v.string(),
        paymentStatus: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Não autenticado");
        }

        // Check if slot is already booked
        const existingAppointments = await ctx.db
            .query("appointments")
            .withIndex("by_date", (q) => q.eq("date", args.date))
            .collect();

        const isSlotTaken = existingAppointments.some(
            (apt) => apt.time === args.time
        );

        if (isSlotTaken) {
            throw new Error("Este horário já está ocupado!");
        }


        // Create the appointment
        const appointmentId = await ctx.db.insert("appointments", {
            clientName: args.clientName,
            phone: args.phone,
            serviceId: args.serviceId,
            serviceName: args.serviceName,
            servicePrice: args.servicePrice,
            date: args.date,
            time: args.time,
            userId: identity.subject as any, // Using subject (Clerk ID) as userId
            paymentStatus: args.paymentStatus || "pending",
            createdAt: Date.now(),
        });

        return appointmentId;
    },
});

// Get booked slots for a specific date
export const getBookedSlots = query({
    args: { date: v.string() },
    handler: async (ctx, args) => {
        const appointments = await ctx.db
            .query("appointments")
            .withIndex("by_date", (q) => q.eq("date", args.date))
            .collect();

        return appointments.map((apt) => apt.time);
    },
});

// Get all appointments for a specific date (for barber dashboard)
export const getAppointmentsByDate = query({
    args: { date: v.string() },
    handler: async (ctx, args) => {
        const appointments = await ctx.db
            .query("appointments")
            .withIndex("by_date", (q) => q.eq("date", args.date))
            .collect();

        // Sort by time
        return appointments.sort((a, b) => a.time.localeCompare(b.time));
    },
});

// Get appointments by user (for client portal)
export const getAppointmentsByUser = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return [];
        }

        const appointments = await ctx.db
            .query("appointments")
            .withIndex("by_user", (q) => q.eq("userId", identity.subject))
            .collect();

        // Sort by date and time, most recent first
        return appointments.sort((a, b) => {
            const dateCompare = b.date.localeCompare(a.date);
            if (dateCompare !== 0) return dateCompare;
            return b.time.localeCompare(a.time);
        });
    },
});

// Update payment status
export const updatePaymentStatus = mutation({
    args: {
        appointmentId: v.id("appointments"),
        paymentStatus: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.appointmentId, {
            paymentStatus: args.paymentStatus,
        });
    },
});

// Delete an appointment (for barber or client)
export const deleteAppointment = mutation({
    args: { id: v.id("appointments") },
    handler: async (ctx, args) => {

        await ctx.db.delete(args.id);
    },
});

// Update appointment status (completed/cancelled)
export const updateAppointmentStatus = mutation({
    args: {
        appointmentId: v.id("appointments"),
        status: v.string(), // "pending" | "completed" | "cancelled"
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.appointmentId, {
            status: args.status,
        });
    },
});

// Get dashboard statistics for a date range
export const getDashboardStats = query({
    args: {
        startDate: v.string(), // Format: YYYY-MM-DD
        endDate: v.string(),   // Format: YYYY-MM-DD
    },
    handler: async (ctx, args) => {
        // Get all appointments (we'll filter by date range in memory)
        const allAppointments = await ctx.db.query("appointments").collect();

        // Filter by date range
        const appointments = allAppointments.filter(apt =>
            apt.date >= args.startDate && apt.date <= args.endDate
        );

        // Calculate statistics
        let totalRevenue = 0;
        let completedCount = 0;
        let cancelledCount = 0;
        let pendingCount = 0;

        appointments.forEach(apt => {
            const status = apt.status || "pending";
            const priceStr = apt.servicePrice.replace(/[^\d,]/g, '').replace(',', '.');
            const price = parseFloat(priceStr) || 0;

            if (status === "completed") {
                completedCount++;
                totalRevenue += price;
            } else if (status === "cancelled") {
                cancelledCount++;
            } else {
                pendingCount++;
            }
        });

        return {
            totalRevenue,
            completedCount,
            cancelledCount,
            pendingCount,
            totalAppointments: appointments.length,
            appointments: appointments.sort((a, b) => {
                const dateCompare = a.date.localeCompare(b.date);
                if (dateCompare !== 0) return dateCompare;
                return a.time.localeCompare(b.time);
            }),
        };
    },
});
