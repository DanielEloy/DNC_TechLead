// auth.middleware.js
import "dotenv/config"
import jwt from 'jsonwebtoken';
import { logger } from "../utils/logger.js"
import userServices from "../service/user.services.js";

// Middleware para autenticação JWT
export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        logger.warn("No token provided");
        return res.status(401).send({ error: "No token provided" });
    }

    // Extrai o token do cabeçalho
    const tokenParts = authHeader.split(" "); // Bearer <token>
    
    // Verificação simplificada do formato
    if (tokenParts.length !== 2) {
        logger.warn("Token error - incorrect format");
        return res.status(401).send({ error: "Token error" });
    }

    const [schema, token] = tokenParts;
    logger.info("Token schema:", tokenParts[0]);
    // Verificação do schema com regex (case-insensitive)
    if (!/^Bearer$/i.test(schema)) {
        logger.warn("Token malformatted - schema incorrect");
        return res.status(401).send({ error: "Token malformatted" });
    }

    // Remove quaisquer quebras de linha ou espaços extras
    const cleanToken = token.replace(/\s+/g, '');

    // Divide o token por pontos para verificar se há múltiplos tokens
    const allParts = cleanToken.split('.');
    
    // Um JWT válido deve ter exatamente 3 partes (header, payload, signature)
    if (allParts.length < 3) {
        logger.warn("Token malformed - not enough sections");
        return res.status(401).send({ error: "Token malformed" });
    }

    // Pega apenas as três primeiras partes (primeiro token válido)
    const firstToken = allParts.slice(0, 3).join('.');                              

    // Log para debug (remova em produção)
    logger.debug("Token received: ", token, "\n\nFirst token extracted: ", firstToken);

    // Verifica o token
    jwt.verify(firstToken, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            logger.warn("Token invalid:", err.message);
            return res.status(401).send({ error: "Token invalid", details: err.message });
        }

        try {
            // Verifica se o usuário existe
            const user = await userServices.getUserByIdService(decoded.id);
            if (!user) {
                logger.warn("User not found for provided token");
                return res.status(401).send({ error: "Invalid token" });
            }

            // Adiciona o ID do usuário ao objeto de requisição
            req.user = { id: user.id };
            next();
        } catch (error) {
            logger.error("Error in auth middleware:", error);
            return res.status(500).send({ error: "Internal server error" });
        }
    });
}