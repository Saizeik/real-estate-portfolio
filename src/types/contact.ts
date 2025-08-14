import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  package: z.string().min(1, "Package selection is required"),
  questions: z.string().optional(),
  honey: z.string().max(0).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
