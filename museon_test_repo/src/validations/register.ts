import { z } from "zod";

export const RegisterValidator = z.object({
    email: z.string().email(),
    name: z.string().min(1),
    password: z.string().min(8),
});