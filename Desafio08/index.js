import express from 'express';
import userRoutes from './src/routes/user.routes.js'; 

const app = express();
const port = 3300;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //habilita o express a entender dados vindos de formulários (body)

app.use('/api', userRoutes); //prefixo para todas as rotas

//app.listen(3000); //caso quiser marretar a porta
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
