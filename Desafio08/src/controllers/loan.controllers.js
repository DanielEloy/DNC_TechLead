// loan.controllers.js
import loanServices from "../service/loan.services.js";
import { logger } from "../utils/logger.js";
import { loanIdSchema } from "../schema/loan.schema.js";

// Controlador para criar um novo empréstimo
async function createLoanController(req, res) {
  try {
    const { bookId, dueDate } = req.body;
    const userId = req.user.id;
    
    const newLoan = await loanServices.createLoanService(userId, bookId, dueDate);
    res.status(201).json(newLoan);
    logger.info(`Loan created successfully for user ID ${userId}`);
  } catch (error) {
    logger.error("Error in createLoanController:", error.message);
    
    if (error.message.includes("already on loan")) {
      return res.status(409).json({ error: error.message });
    }
    
    if (error.message.includes("must be in the future")) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controlador para buscar todos os empréstimos
async function findAllLoansController(req, res) {
  try {
    const loans = await loanServices.findAllLoansService();
    res.status(200).json(loans);
    logger.info("Fetched all loans successfully");
  } catch (error) {
    logger.error("Error in findAllLoansController:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controlador para buscar um empréstimo por ID
async function deleteLoanController(req, res) {
  try {
    // Validar parâmetro da rota
    const { id } = loanIdSchema.parse({ id: req.params.id });
    const userId = req.user.id;
    
    const deletedLoan = await loanServices.deleteLoanService(id, userId);
    res.status(200).json(deletedLoan);
    logger.info(`Loan with ID ${id} deleted successfully by user ${userId}`);
  } catch (error) {
    logger.error("Error in deleteLoanController:", error.message);
    
    if (error.message.includes("not found")) {
      return res.status(404).json({ error: error.message });
    }
    
    if (error.message.includes("permission")) {
      return res.status(403).json({ error: error.message });
    }
    
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controlador para buscar um empréstimo por ID
async function findLoanByIdController(req, res) {
  try {
    // Validar parâmetro da rota
    const { id } = loanIdSchema.parse({ id: req.params.id });
    
    const loan = await loanServices.findLoanByIdService(id);
    res.status(200).json(loan);
    logger.info(`Fetched loan with ID ${id}`);
  } catch (error) {
    logger.error("Error in findLoanByIdController:", error.message);
    
    if (error.message.includes("not found")) {
      return res.status(404).json({ error: error.message });
    }
    
    res.status(500).json({ error: "Internal server error" });
  }
}

export default {
  createLoanController,
  findAllLoansController,
  findLoanByIdController,
  deleteLoanController
};