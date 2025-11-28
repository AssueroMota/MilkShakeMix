import React from "react";
import {
  PieChart, Pie, Cell,
  LineChart, Line,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import {
  FaChartLine,     // Substitui FaArrowTrendUp
  FaShoppingCart,
  FaTrophy,
  FaDollarSign
} from "react-icons/fa";



import "./Dashboard.scss";

export default function Dashboard() {
  // ---------- DADOS ----------

  const vendasCategoria = [
    { name: "Milk-shake", value: 31, color: "#ff4ecb" },
    { name: "Sorvete", value: 21, color: "#6c5ce7" },
    { name: "Açaí", value: 15, color: "#00cec9" },
    { name: "Hambúrguer", value: 18, color: "#fdcb6e" },
    { name: "Porções", value: 8, color: "#0984e3" },
  ];

  const metodosPagamento = [
    { name: "PIX", value: 48, color: "#00c853" },
    { name: "Crédito", value: 30, color: "#6c5ce7" },
    { name: "Débito", value: 12, color: "#00bcd4" },
    { name: "Dinheiro", value: 10, color: "#ff5722" },
  ];

  const vendasHora = [
    { hora: "10h", vendas: 60 },
    { hora: "12h", vendas: 140 },
    { hora: "14h", vendas: 220 },
    { hora: "16h", vendas: 190 },
    { hora: "18h", vendas: 300 },
    { hora: "20h", vendas: 320 },
    { hora: "22h", vendas: 200 },
  ];

  const combosIndiv = [
    { name: "Combos", hoje: 58, ontem: 49 },
    { name: "Individuais", hoje: 33, ontem: 20 },
  ];

  const topProdutos = [
    { name: "Pizza Margherita", vendas: 14 },
    { name: "Sorvete Chocolate", vendas: 21 },
    { name: "Coxinha Especial", vendas: 18 },
    { name: "Açaí Tradicional", vendas: 24 },
    { name: "Milk-shake Oreo", vendas: 36 },
  ];

  const crescimentoMensal = [
    { mes: "Jan", vendas: 32000 },
    { mes: "Fev", vendas: 38000 },
    { mes: "Mar", vendas: 45000 },
    { mes: "Abr", vendas: 50000 },
    { mes: "Mai", vendas: 61000 },
    { mes: "Jun", vendas: 58000 },
    { mes: "Jul", vendas: 72000 },
  ];

  const ultimosPedidos = [
    { id: 127, hora: "14:32", tipo: "Entrega", total: "45,90", status: "entregue" },
    { id: 126, hora: "14:22", tipo: "Balcão", total: "19,50", status: "pronto" },
    { id: 125, hora: "14:15", tipo: "Local", total: "67,20", status: "preparando" },
    { id: 124, hora: "14:12", tipo: "Entrega", total: "29,90", status: "cancelado" },
  ];

  return (
    <div className="dashboard-container">

      <div className="dashboard-header">
        <h1>Dashboard</h1>

        <button
          className="btn-relatorio"
          onClick={() => window.open("/dashboard/relatorio", "_blank")}
        >
          📄 Gerar Relatório
        </button>
      </div>

      {/* ========================= CARDS ========================= */}
      <div className="cards-grid">
        <div className="card">
          <div className="icon purple"><FaChartLine className="card-icon" /></div>
          <p>Vendas do Dia</p>
          <h2>R$ 2.847,00</h2>
          <span className="sub green">+12% vs ontem</span>
        </div>

        <div className="card">
          <div className="icon orange"><FaShoppingCart /></div>
          <p>Total de Pedidos</p>
          <h2>127</h2>
          <span className="sub green">+8% vs ontem</span>
        </div>

        <div className="card">
          <div className="icon pink"><FaTrophy /></div>
          <p>Produto Mais Vendido</p>
          <h2>Milk-shake Oreo</h2>
          <span className="sub purple">34 vendas hoje</span>
        </div>

        <div className="card">
          <div className="icon green"><FaDollarSign /></div>
          <p>Ticket Médio</p>
          <h2>R$ 22,40</h2>
          <span className="sub green">+5% vs ontem</span>
        </div>
      </div>

      {/* ========================= GRAFICO pizza ========================= */}
      <div className="charts-row">

        {/* ================= VENDAS POR CATEGORIA ================= */}
        <div className="chart-box">
          <h3>Vendas por Categoria</h3>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={vendasCategoria}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={3}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {vendasCategoria.map((entry, index) => (
                  <Cell key={index} fill={entry.color} stroke="#fff" strokeWidth={1} />
                ))}
              </Pie>

              <Tooltip
                formatter={(value, name, entry) => [
                  `${value} vendas (${entry.percent?.toFixed(2) * 100}%)`,
                  name
                ]}
                contentStyle={{
                  background: "#fff",
                  borderRadius: "10px",
                  padding: "8px 12px",
                  border: "1px solid #eee",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <ul className="legend">
            {vendasCategoria.map((c, i) => (
              <li key={i}>
                <span style={{ background: c.color }}></span>
                {c.name} • {c.value} vendas
              </li>
            ))}
          </ul>
        </div>

        {/* ================= MÉTODOS DE PAGAMENTO ================= */}
        <div className="chart-box">
          <h3>Métodos de Pagamento</h3>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={metodosPagamento}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={2}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {metodosPagamento.map((entry, index) => (
                  <Cell key={index} fill={entry.color} stroke="#fff" strokeWidth={1} />
                ))}
              </Pie>

              <Tooltip
                formatter={(value, name, entry) => [
                  `${value} transações (${entry.percent?.toFixed(2) * 100}%)`,
                  name
                ]}
                contentStyle={{
                  background: "#fff",
                  borderRadius: "10px",
                  padding: "8px 12px",
                  border: "1px solid #eee",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <ul className="legend">
            {metodosPagamento.map((m, i) => (
              <li key={i}>
                <span style={{ background: m.color }}></span>
                {m.name} • {m.value} usos
              </li>
            ))}
          </ul>
        </div>

      </div>


      {/* ========================= LINHA + BARRA ========================= */}
      <div className="charts-row">

        <div className="chart-box">
          <h3>Vendas por Hora</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={vendasHora}>
              <XAxis dataKey="hora" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="vendas" stroke="#e84393" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Combos vs Individuais</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={combosIndiv}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="hoje" fill="#6c5ce7" />
              <Bar dataKey="ontem" fill="#ff4ecb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* ========================= TOP + LINHA ========================= */}
      <div className="charts-row">

        <div className="chart-box">
          <h3>Top Produtos Vendidos</h3>
          <ResponsiveContainer width="100%" height={270}>
            <BarChart data={topProdutos} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={130} />
              <Tooltip />
              <Bar dataKey="vendas" fill="#fd79a8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Crescimento Mensal</h3>
          <ResponsiveContainer width="100%" height={270}>
            <LineChart data={crescimentoMensal}>
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="vendas"
                stroke="#a55eea"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* ========================= TABELA ========================= */}
      <div className="table-box">
        <h3>Últimos Pedidos</h3>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Hora</th>
              <th>Tipo</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {ultimosPedidos.map((p) => (
              <tr key={p.id}>
                <td>#{p.id}</td>
                <td>{p.hora}</td>
                <td>{p.tipo}</td>
                <td>R$ {p.total}</td>
                <td>
                  <span className={`tag ${p.status}`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
