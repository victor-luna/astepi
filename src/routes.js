import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import Cadastro from "./pages/Cadastro/cadastro";
import Agendamento from "./pages/Agendamento/agendamento";
function Router() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/agendamento" element={<Agendamento />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Router;