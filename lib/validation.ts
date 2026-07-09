import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  company: z.string().optional(),
});

export const signinSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  subject: z.string().optional(),
});

export const campaignSchema = z.object({
  name: z.string().min(2, "Campaign name is required"),
  packageId: z.string().min(1, "Package is required"),
  geo: z.string().min(2, "Geographic area is required"),
  keywords: z.array(z.string()).min(1, "At least one keyword is required"),
  adSpend: z.number().min(0),
});

export const bookingSchema = z.object({
  slotStart: z.string().min(1, "Date/time is required"),
  packageId: z.string().min(1, "Package is required"),
  notes: z.string().optional(),
});

export const formSchema = z.object({
  name: z.string().min(2, "Form name is required"),
  fields: z.array(z.object({
    id: z.string(),
    type: z.enum(["text", "email", "phone", "textarea", "select", "number"]),
    label: z.string().min(1, "Label is required"),
    required: z.boolean(),
    options: z.array(z.string()).optional(),
    placeholder: z.string().optional(),
  })).min(1, "At least one field is required"),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type CampaignInput = z.infer<typeof campaignSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type FormInput = z.infer<typeof formSchema>;
