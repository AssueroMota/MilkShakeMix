// App.jsx
import "./app.css";
import "../sass/global.scss";
import "animate.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

// PÁGINAS
import LoginPage from "./pages/login/LoginPage";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Cardapio from "./pages/Cardapio/Cardapio.jsx";
import Categorias from "./pages/Categorias/Categorias.jsx";
import Produtos from "./pages/Produtos/Produtos.jsx";
import Adicionais from "./pages/Adicionais/Adicionais.jsx";
import Combos from "./pages/Combos/Combos.jsx";
import Promocoes from "./pages/Promocoes/Promocoes.jsx";
import Caixa from "./pages/Caixa/Caixa.jsx";
import Pedidos from "./pages/Pedidos/Pedidos.jsx";
import Configuracoes from "./pages/Configuracoes/Configuracoes.jsx";
import RelatorioDashboard from "./pages/Dashboard/RelatorioDashboard.jsx";

function App() {
  return (
    <Router>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<LoginPage />} />

        {/* TELAS DO PAINEL COM LAYOUT */}
        <Route
          path="/dashboard"
          element={
            <Layout title="Dashboard">
              <Dashboard />
            </Layout>
          }
        />
        <Route path="/dashboard/relatorio" element={<RelatorioDashboard />} />

        <Route
          path="/cardapio"
          element={
            <Layout title="Cardápio">
              <Cardapio />
            </Layout>
          }
        />

        <Route
          path="/categorias"
          element={
            <Layout title="Categorias">
              <Categorias />
            </Layout>
          }
        />

        <Route
          path="/produtos"
          element={
            <Layout title="Produtos">
              <Produtos />
            </Layout>
          }
        />

        <Route
          path="/adicionais"
          element={
            <Layout title="Adicionais">
              <Adicionais />
            </Layout>
          }
        />

        <Route
          path="/combos"
          element={
            <Layout title="Combos">
              <Combos />
            </Layout>
          }
        />

        <Route
          path="/promocoes"
          element={
            <Layout title="Promoções">
              <Promocoes />
            </Layout>
          }
        />

        <Route
          path="/caixa"
          element={
            <Layout title="Caixa (PDV)">
              <Caixa />
            </Layout>
          }
        />

        <Route
          path="/Pedidos"
          element={
            <Layout title="Pedidos">
              <Pedidos />
            </Layout>
          }
        />

        <Route
          path="/configuracoes"
          element={
            <Layout title="Configurações">
              <Configuracoes />
            </Layout>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
