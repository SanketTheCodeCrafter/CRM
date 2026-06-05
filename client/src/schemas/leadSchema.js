import { z } from 'zod';

export const leadSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name must not exceed 50 characters' })
    .trim(),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please provide a valid email address' })
    .trim(),
  phone: z
    .string()
    .min(7, { message: 'Phone number must be at least 7 characters' })
    .max(20, { message: 'Phone number must not exceed 20 characters' })
    .trim(),
  company: z
    .string()
    .min(2, { message: 'Company name must be at least 2 characters' })
    .max(100, { message: 'Company name must not exceed 100 characters' })
    .trim(),
  status: z.enum(['New', 'Contacted', 'Qualified', 'Converted', 'Lost'], {
    errorMap: () => ({ message: 'Please select a valid status' }),
  }),
  notes: z
    .string()
    .max(500, { message: 'Notes must not exceed 500 characters' })
    .default('')
    .or(z.literal('')),
});
export default leadSchema;
