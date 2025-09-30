// validation.middlewares.js
import { logger } from '../utils/logger.js';
import { z } from 'zod';
import { bookIdSchema } from '../schema/book.schema.js';

const validate = (schema) => (req, res, next) => {
  try {
    // Log do corpo da requisição para depuração (apenas em desenvolvimento)
    if (process.env.NODE_ENV !== 'production') {
      logger.debug('Validating request body:', req.body);
    }

    // Usamos safeParse que não lança exceção
    const result = schema.safeParse(req.body);
  

    if (result.success) {
      next();
    } else {
      // Processar erros de validação
      const formattedErrors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
        code: issue.code,
        ...(issue.expected && { expected: issue.expected }),
        ...(issue.received && { received: issue.received })
      }));

      // Log dos erros de validação
      logger.warn('Validation failed:', formattedErrors);

      return res.status(400).json({
        statusCode: 400,
        message: "Bad Request",
        error: "Validation Error",
        details: formattedErrors
      });
    } 
  } catch (e) {
    // Log do erro inesperado
    logger.error("Unexpected validation error:", e);
    
    // Em produção, não exponha detalhes do erro
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? "An internal server error occurred during validation" 
      : e.message;

    return res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
      error: "Validation Process Failed",
      details: errorMessage
    });
  }
};

// Middleware específico para validar o ID do usuário na rota
const validateUserId = (req, res, next) => {
  const schema = z.object({
    id: z
      .string()
      .regex(/^\d+$/, "User ID must be a valid number") // se for numérico
      .transform(Number),
  });

  const result = schema.safeParse(req.params);

  if (!result.success) {
    const formattedErrors = result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
      code: issue.code,
    }));

    logger.warn("UserId validation failed:", formattedErrors);

    return res.status(400).json({
      statusCode: 400,
      message: "Bad Request",
      error: "Validation Error",
      details: formattedErrors,
    });
  }

  // Substitui req.params.id pelo número já convertido
  req.params.id = result.data.id;
  next();
};


// Middleware específico para validar o ID do livro na rota
const validateBookId = (req, res, next) => {
  try {
    bookIdSchema.parse({ bookId: +req.params.id });
    next();
  } catch (error) {
    const formattedErrors = error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
      code: issue.code,
    }));
    logger.warn("BookId validation failed:", formattedErrors);
    return res.status(400).json({
      statusCode: 400,
      message: "Bad Request",
      error: "Validation Error",
      details: formattedErrors,
    });
  }
};    

export { validate, validateUserId, validateBookId };