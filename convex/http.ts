import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

// Mercado Pago webhook endpoint
http.route({
    path: "/webhook/mercadopago",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        try {
            const body = await request.json();

            // MP sends notifications with type "payment" when a payment is made
            if (body.type === "payment" && body.data?.id) {
                // Check payment status via action
                const paymentInfo = await ctx.runAction(api.mercadopago.checkPaymentStatus, {
                    paymentId: String(body.data.id),
                });

                // If payment is approved, update the appointment
                if (paymentInfo.status === "approved" && paymentInfo.externalReference) {
                    await ctx.runMutation(api.appointments.updatePaymentStatus, {
                        appointmentId: paymentInfo.externalReference as any,
                        paymentStatus: "paid",
                    });
                }
            }

            return new Response("OK", { status: 200 });
        } catch (error) {
            console.error("Webhook error:", error);
            // Always return 200 to MP to avoid retries on our errors
            return new Response("OK", { status: 200 });
        }
    }),
});

// Allow GET for webhook verification
http.route({
    path: "/webhook/mercadopago",
    method: "GET",
    handler: httpAction(async (_ctx, _request) => {
        return new Response("Webhook endpoint active", { status: 200 });
    }),
});

export default http;
