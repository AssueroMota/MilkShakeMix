import "./RelatorioDashboard.scss";

export default function RelatorioDashboard() {
  const dataAtual = new Date().toLocaleDateString("pt-BR");

  // ======== DADOS DO DIA (pode puxar reais depois) ========
  const vendasHoje = 2847;
  const totalPedidos = 127;
  const ticketMedio = 22.4;
  const produtoMaisVendido = "Milk-shake Oreo";
  const maisVendidoQtd = 34;

  const categorias = [
    { nome: "Milk-shake", valor: 31 },
    { nome: "Sorvete", valor: 21 },
    { nome: "Açaí", valor: 15 },
    { nome: "Hambúrguer", valor: 18 },
    { nome: "Porções", valor: 8 },
  ];

  const metodos = [
    { nome: "PIX", valor: 48 },
    { nome: "Cartão Crédito", valor: 30 },
    { nome: "Cartão Débito", valor: 12 },
    { nome: "Dinheiro", valor: 10 },
  ];

  return (
    <div className="relatorio-wrapper">

      {/* CABEÇALHO */}
      <header className="relatorio-header">
        <h1>Relatório Diário — MilkShake Mix</h1>
        <span className="data">{dataAtual}</span>
      </header>

      {/* INTRODUÇÃO */}
      <section className="relatorio-section">
        <h2>📌 Resumo do Dia</h2>
        <p>
          Este relatório apresenta uma visão clara e objetiva do desempenho do estabelecimento
          no dia de hoje. Ele foi desenvolvido para facilitar o entendimento do proprietário,
          com observações diretas, simples e úteis para decisões do dia a dia.
        </p>

        <ul className="relatorio-lista">
          <li><strong>Vendas Totais:</strong> R$ {vendasHoje.toFixed(2).replace(".", ",")}</li>
          <li><strong>Total de Pedidos:</strong> {totalPedidos}</li>
          <li><strong>Ticket Médio:</strong> R$ {ticketMedio.toFixed(2).replace(".", ",")}</li>
          <li><strong>Produto Mais Vendido:</strong> {produtoMaisVendido} ({maisVendidoQtd} vendas)</li>
        </ul>
      </section>

      {/* CATEGORIAS */}
      <section className="relatorio-section">
        <h2>🍨 Desempenho por Categoria</h2>

        <table className="relatorio-tabela">
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Participação (%)</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((c, i) => (
              <tr key={i}>
                <td>{c.nome}</td>
                <td>{c.valor}%</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="relatorio-obs">
          ➤ As categorias mais fortes continuam sendo <strong>Milk-shake</strong> e 
          <strong> Sorvete</strong>, responsáveis por uma grande parte das vendas
          totais. Vale considerar promoções nessas categorias para potencializar ainda mais.
        </p>
      </section>

      {/* MÉTODOS DE PAGAMENTO */}
      <section className="relatorio-section">
        <h2>💳 Métodos de Pagamento</h2>

        <table className="relatorio-tabela">
          <thead>
            <tr>
              <th>Método</th>
              <th>Percentual (%)</th>
            </tr>
          </thead>
          <tbody>
            {metodos.map((m, i) => (
              <tr key={i}>
                <td>{m.nome}</td>
                <td>{m.valor}%</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="relatorio-obs">
          ➤ O PIX continua sendo o meio preferido dos clientes (quase metade das transações).  
          Pode-se investir em divulgação de promoções com desconto via PIX.
        </p>
      </section>

      {/* RECOMENDAÇÕES */}
      <section className="relatorio-section">
        <h2>📝 Recomendações do Sistema</h2>

        <ul className="relatorio-lista recomendacoes">
          <li>
            ✔ <strong>Horários de pico:</strong> considere aumentar equipe entre 
            18h e 21h, onde costumam ocorrer os maiores volumes de pedidos.
          </li>

          <li>
            ✔ <strong>Produtos destaque:</strong> recomendo manter sempre em estoque o 
            <strong> Milk-shake Oreo</strong> — ele é o que mais atrai clientes.
          </li>

          <li>
            ✔ <strong>Ticket médio:</strong> está dentro do esperado. Porém, combos 
            e adicionais podem aumentar esse valor.
          </li>

          <li>
            ✔ <strong>Métodos de pagamento:</strong> explorar campanhas específicas para 
            quem paga via PIX pode aumentar conversão.
          </li>

          <li>
            ✔ <strong>Marketing:</strong> clientes respondem muito bem a fotos bem feitas
            e promoções rápidas no Instagram.
          </li>
        </ul>
      </section>

      <footer className="relatorio-footer">
        <p>Relatório gerado automaticamente pelo sistema MilkShake Mix ©</p>
      </footer>
    </div>
  );
}
