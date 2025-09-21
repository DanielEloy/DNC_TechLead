// src/routes/loan.routes.js
import { Router } from 'express';
import loanController from '../controllers/loan.controllers.js';
import { validate } from '../middlewares/validation.middlewares.js';
import { loanSchema } from '../schema/loan.schema.js';
import { logger } from '../utils/logger.js';

logger.info("Loan routes initialized");

const router = Router();

// Rota para criar um novo empréstimo
router.post('/loans', validate(loanSchema), loanController.createLoanController);

// Rota para buscar todos os empréstimos
router.get('/loans/', loanController.findAllLoansController);

// Rota para buscar um empréstimo por ID
router.get('/loans/:id', loanController.findLoanByIdController);

// Rota para deletar um empréstimo por ID
router.delete('/loans/:id', validate(loanSchema), loanController.deleteLoanController);

// Logs informativos (apenas para debugging)
logger.debug({
  message: "📋 Loan Routes Registered",
  routes: [
    "📨 POST    /loans          → Create new loan",
    "👀 GET     /loans          → Fetch all loans", 
    "👀 GET     /loans/:id      → Fetch loan by ID",
    "🗑️ DELETE  /loans/:id      → Delete loan by ID"
  ]
});

export default router;