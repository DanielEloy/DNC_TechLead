// src/routes/loan.routes.js
import { Router } from 'express';
import loanController from '../controllers/loan.controllers.js';
import { validate } from '../middlewares/validation.middlewares.js';
import { loanSchema } from '../schema/loan.schema.js';
import { logger } from '../utils/logger.js';

logger.info("Loan routes initialized");

const router = Router();

// Rotas PÚBLICAS (não requerem autenticação)
router.get('/', loanController.findAllLoansController);
router.get('/:id', loanController.findLoanByIdController);

// Rotas PROTEGIDAS (requerem autenticação)
router.post('/', validate(loanSchema), loanController.createLoanController);
router.delete('/:id', validate(loanSchema), loanController.deleteLoanController);

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

export default router