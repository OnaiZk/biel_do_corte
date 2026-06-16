import { action } from "./_generated/server";
import { v } from "convex/values";

export const checkPin = action({
    args: {
        pin: v.string(),
    },
    handler: async (_ctx, args) => {
        // Read the PIN securely from the backend environment variables
        const correctPin = process.env.BARBER_PIN || "1234";
        return args.pin === correctPin;
    },
});
