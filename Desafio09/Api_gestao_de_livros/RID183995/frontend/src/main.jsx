/* src\main.jsx */
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.scss";
import Home from "./views/Home/Home.jsx";
import Livros from "./views/Livros/Livros.jsx";
import LivrosCadastro from "./views/LivrosCadastro/LivrosCadastro.jsx";
import LivrosEdicao from "./views/LivrosEdicao/LivrosEdicao.jsx";
import TestConnection from "./components/TestConnection/TestConnection.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/livros",
    element: <Livros />,
  },
  {
    path: "/livros/cadastro",
    element: <LivrosCadastro />,
  },
  {
    path: "/livros/edicao/:livroId",
    element: <LivrosEdicao />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TestConnection />
    <RouterProvider router={router} />
  </React.StrictMode>
);
