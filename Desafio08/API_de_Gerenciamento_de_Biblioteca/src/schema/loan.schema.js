// loan.schema.js
import { z } from 'zod';

// Esquema para criar um novo empréstimo
const loanSchema = z.object({
  bookId: z.number().int().positive("bookId must be a positive integer"),
  dueDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "DueDate must be in YYYY-MM-DD format")
    .refine((date) => new Date(date) > new Date(), {
      message: "Due date must be in the future"
    }),
});

const loanIdSchema = z.object({
     id: z.string().regex(/^\d+$/, "ID must be a number").transform(Number)
});

export { loanSchema, loanIdSchema };