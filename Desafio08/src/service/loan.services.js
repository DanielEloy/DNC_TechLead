// loan.services.js
import loanRepositories from "../repositories/loan.repositories.js";
import { logger } from "../utils/logger.js";

async function createLoanService(userId, bookId, dueDate) {
  // Verifica se o livro já está emprestado
  const existingLoan = await loanRepositories.findActiveLoanByBookIdRepository(bookId);
  if (existingLoan) {
    logger.error(`Book with ID ${bookId} is already on loan`);
    throw new Error("This book is already on loan");
  }

  const createdLoan = await loanRepositories.createLoanRepository(userId, bookId, dueDate);
  
  if (!createdLoan) {
    logger.error("Error creating loan in service");
    throw new Error("Error creating loan");
  }
  
  logger.info(`Loan created successfully with ID: ${createdLoan.id}`);
  return createdLoan;
}

async function findAllLoansService() {
  const loans = await loanRepositories.findAllLoansRepository();
  
  if (!loans) {
    logger.error("Error fetching loans in service");
    throw new Error("Error fetching loans");
  }
  
  logger.info(`Fetched ${loans.length} loans`);
  return loans;
}

async function findLoanByIdService(loanId) {
  const loan = await loanRepositories.findLoanByIdRepository(loanId);
  
  if (!loan) {
    logger.error(`Loan with ID ${loanId} not found in service`);
    throw new Error("Loan not found");
  }
  
  logger.info(`Fetched loan by ID: ${loanId}`);
  return loan;
}

async function deleteLoanService(loanId, userId) {
  const loan = await loanRepositories.findLoanByIdRepository(loanId);
  
  if (!loan) {
    logger.error(`Loan with ID ${loanId} not found for deletion`);
    throw new Error("Loan not found");
  }
  
  // Verifica se o usuário tem permissão para excluir este empréstimo
  if (loan.userId !== userId) {
    logger.error(`User ${userId} tried to delete loan ${loanId} without permission`);
    throw new Error("You don't have permission to delete this loan");
  }
  
  const deletedLoan = await loanRepositories.deleteLoanRepository(loanId);
  
  if (!deletedLoan) {
    logger.error("Error deleting loan in service");
    throw new Error("Error deleting loan");
  }
  
  logger.info(`Loan deleted successfully with ID: ${deletedLoan.id}`);
  return deletedLoan;
}

export default {
  createLoanService,
  findAllLoansService,
  findLoanByIdService,
  deleteLoanService
};