// book.schema.js
import { z } from 'zod';


const bookSchema = z.object({
    title: z
        .string()
        .min(1, { message: "Title is required" }),
    author: z
        .string()
        .min(1, { message: "Author is required" }),
});

const bookIdSchema = z.object({
    bookId: z
        .number({ invalid_type_error: "Book ID must be a number" })
        .int({ message: "Book ID must be an integer" })
        .positive({ message: "Book ID must be a positive number" }),
});

export { bookSchema, bookIdSchema };