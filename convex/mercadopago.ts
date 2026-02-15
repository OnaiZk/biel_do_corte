"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

// Create a Mercado Pago payment preference (Checkout Pro)
export const createPreference = action({
    args: {
        title: v.string(),
        price: v.number(),
        appointmentId: v.string(),
    },
    handler: async (_ctx, args) => {
        const accessToken = process.env.MP_ACCESS_TOKEN;
        if (!accessToken) {
            throw new Error("MP_ACCESS_TOKEN não configurado no Convex");
        }

        const client = new MercadoPagoConfig({ accessToken });
        const preference = new Preference(client);

        const siteUrl = process.env.SITE_URL || "https://bieldocorte.app";

        const result = await preference.create({
            body: {
                items: [
                    {
                        id: args.appointmentId,
                        title: args.title,
                        quantity: 1,
                        unit_price: args.price,
                        currency_id: "BRL",
                    },
                ],
                back_urls: {
                    success: `${siteUrl}?payment=success&appointment=${args.appointmentId}`,
                    failure: `${siteUrl}?payment=failure&appointment=${args.appointmentId}`,
                    pending: `${siteUrl}?payment=pending&appointment=${args.appointmentId}`,
                },
                auto_return: "approved",
                external_reference: args.appointmentId,
                statement_descriptor: "BIEL DO CORTE",
            },
        });

        return {
            preferenceId: result.id,
            initPoint: result.init_point,
            sandboxInitPoint: result.sandbox_init_point,
        };
    },
});

// Check payment status by payment ID
export const checkPaymentStatus = action({
    args: {
        paymentId: v.string(),
    },
    handler: async (_ctx, args) => {
        const accessToken = process.env.MP_ACCESS_TOKEN;
        if (!accessToken) {
            throw new Error("MP_ACCESS_TOKEN não configurado no Convex");
        }

        const client = new MercadoPagoConfig({ accessToken });
        const payment = new Payment(client);

        const result = await payment.get({ id: args.paymentId });

        return {
            status: result.status,
            statusDetail: result.status_detail,
            externalReference: result.external_reference,
        };
    },
});
