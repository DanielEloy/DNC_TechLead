// loan.routes.js
import { Router } from 'express';
import loanController from '../controllers/loan.controllers.js';
import { validate } from '../middlewares/validation.middlewares.js';
import { loanSchema } from '../schema/loan.schema.js';
import { logger } from '../utils/logger.js';

const router = Router();

// Rota para criar um novo empréstimo
router.post('/loans', validate(loanSchema), loanController.createLoanController);
logger.info("POST /loans route accessed for creating a new loan");

// Rota para buscar todos os empréstimos
router.get('/loans/', loanController.findAllLoansController);
logger.info("GET /loans route accessed for fetching all loans");

// Rota para buscar um empréstimo por ID
router.get('/loans/:id', loanController.findLoanByIdController);
logger.info("GET /loans/:id route accessed for fetching a loan by ID");

// Rota para deletar um empréstimo por ID
router.delete('/loans/:id', loanController.deleteLoanController);
logger.info("DELETE /loans/:id route accessed for deleting a loan by ID");

export default router;