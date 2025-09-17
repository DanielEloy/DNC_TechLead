import { z } from 'zod';

const bookSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    author: z.string().min(1, { message: "Author is required" }),
});

export { bookSchema };