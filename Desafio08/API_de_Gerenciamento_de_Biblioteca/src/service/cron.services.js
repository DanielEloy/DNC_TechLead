// cron.services.js
import cron from 'node-cron';
import { sendEmail } from './email.service.js';
import { logger } from "../utils/logger.js";
import loanRepository from '../repositories/loan.repositories.js';
import moment from 'moment';

// Agendar tarefa para rodar todo dia às 22:00
cron.schedule('0 22 * * *', async () => {
    try {
        logger.info('Running scheduled task to send reminder emails');
        
        // Verificar se as variáveis de ambiente estão disponíveis
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            logger.error('Email credentials not available in cron job');
            return;
        }
        
        const loans = await loanRepository.findAllLoansRepository();
        const today = moment().startOf('day');

        for (const loan of loans) {
            try {
                const dueDate = moment(loan.dueDate).startOf('day');
                const reminderDueDate = moment(dueDate).subtract(1, 'days');
                
                if (!user || !book) {
                    logger.warn(`Could not find user or book for loan ID: ${loan.id}`);
                    continue;
                }
                
                if (today.isSame(reminderDueDate, 'day')) {
                    await sendEmail(user.email, book.title, dueDate.format('YYYY-MM-DD'));
                    logger.info(`Reminder email sent to ${user.email} for book "${book.title}" due on ${dueDate.format('YYYY-MM-DD')}`);
                }
            } catch (error) {
                logger.error(`Error processing loan ${loan.id}: ${error.message}`);
            }
        }
    } catch (error) {
        logger.error(`Error in scheduled task: ${error.message}`);
    }
});

logger.info('Cron job scheduled to run daily at 22:00 for reminder emails');