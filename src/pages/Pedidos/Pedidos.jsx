import React, { useState } from "react";
import EditarPedidoModal from "./EditarPedidoModal.jsx";
import "./Pedidos.scss";
import StatusBadge from "./StatusBadge.jsx";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([
    {
      id: 101,
      itens: [
        { name: "Hambúrguer Artesanal", qty: 1 },
        { name: "Batata Frita", qty: 1 },
      ],
      total: 39.8,
      hora: "12:42",
      status: "solicitado",
    },
    {
      id: 102,
      itens: [{ name: "Milk-shake Morango", qty: 2 }],
      total: 35.8,
      hora: "12:50",
      status: "andamento",
    },
  ]);

  const [editingPedido, setEditingPedido] = useState(null);
  const [filtroStatus, setFiltroStatus] = useState("abertos");
  const [busca, setBusca] = useState("");

  // ===================== Atualizar Status =====================
  const atualizarStatus = (id, novoStatus) => {
    setPedidos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: novoStatus } : p))
    );
  };

  // ===================== Enviar para o Caixa =====================
  const irParaCaixa = (pedido) => {
    atualizarStatus(pedido.id, "finalizado");
    window.location.href = `/caixa?pedido=${pedido.id}`;
  };

  const deletarPedido = (id) => {
    setPedidos((prev) => prev.filter((p) => p.id !== id));
  };

  const salvarEdicao = (pedidoAtualizado) => {
    setPedidos((prev) =>
      prev.map((p) => (p.id === pedidoAtualizado.id ? pedidoAtualizado : p))
    );
    setEditingPedido(null);
  };

  // ===================== FILTROS =====================
  const pedidosFiltrados = pedidos.filter((p) => {
    const statusOK =
      filtroStatus === "abertos"
        ? p.status !== "finalizado"
        : p.status === "finalizado";

    const buscaOK = p.itens.some((i) =>
      i.name.toLowerCase().includes(busca.toLowerCase())
    );

    return statusOK && buscaOK;
  });

  return (
    <div className="pedidos-container">
      <h1 className="titulo-pedidos">Pedidos</h1>

      {/* ========= FILTROS ========= */}
      <div className="filtros-top">
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar pedido..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <select
          className="filtro-status"
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
        >
          <option value="abertos">Abertos</option>
          <option value="fechados">Fechados</option>
        </select>
      </div>

      {/* CABEÇALHO */}
      <div className="pedidos-header">
        <div>Pedido</div>
        <div>Itens</div>
        <div>Total</div>
        <div>Horário</div>
        <div>Status</div>
        <div>Ações</div>
      </div>

      {/* LISTA */}
      {pedidosFiltrados.length === 0 && (
        <p className="nenhum-pedido">Nenhum pedido encontrado para o filtro atual.</p>
      )}

      {pedidosFiltrados.map((p) => (
        <div className="pedido-row" key={p.id}>
          <div>
            <strong>#00{p.id}</strong>
          </div>

          <div className="itens-col">
            {p.itens.map((i, index) => (
              <div key={index} className="item-line">
                {i.qty}x {i.name}
              </div>
            ))}
          </div>

          <div>
            <strong>R$ {p.total.toFixed(2).replace(".", ",")}</strong>
          </div>

          <div>{p.hora}</div>

          <div>
            <StatusBadge
              status={p.status}
              onChange={(novo) => atualizarStatus(p.id, novo)}
            />
          </div>

<div className="acoes-col">

  {/* EDITAR — sempre aparece */}
  <button className="btn icon editar" onClick={() => setEditingPedido(p)} />

  {/* SOLICITADO → botão ACEITAR (✔) */}
  {p.status === "solicitado" && (
    <button
      className="btn icon aceitar"
      onClick={() => atualizarStatus(p.id, "andamento")}
    />
  )}

  {/* ANDAMENTO → botão CAIXA */}
  {p.status === "andamento" && (
    <button
      className="btn icon caixa"
      onClick={() => irParaCaixa(p)}
    />
  )}

  {/* FINALIZADO → só deletar */}

  {/* DELETAR — sempre aparece */}
  <button className="btn icon deletar" onClick={() => deletarPedido(p.id)} />
</div>


        </div>
      ))}

      {editingPedido && (
        <EditarPedidoModal
          pedido={editingPedido}
          onClose={() => setEditingPedido(null)}
          onSave={salvarEdicao}
        />
      )}
    </div>
  );
}
