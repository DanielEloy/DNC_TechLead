//./routes/index.js
import { Router } from "express"
import userRouters from "./user.routes.js"
import bookRouters from "./book.routes.js"
import loanRouters from "./loan.routes.js"
import { logger } from "../utils/logger.js"

logger.info(" Routes initialized ")

const routers = Router()

routers.use(userRouters);
routers.use(bookRouters);
routers.use(loanRouters);

export { routers }
