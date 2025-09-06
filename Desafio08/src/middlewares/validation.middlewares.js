// validation.middlewares.js
import { logger } from '../utils/logger.js';

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

export { validate };