import React, { useState } from "react";
import "./DetailsModal.scss";

export default function DetailsModal({ item, onClose, onAdd }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="details-overlay">
      <div className="details-modal">

        {/* BOTÃO FECHAR */}
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        {/* IMAGEM DO PRODUTO */}
        <div className="details-image">
          <img src={item.image} alt={item.name} />
        </div>

        {/* TÍTULO E DESCRIÇÃO */}
        <div className="details-info">
          <h2>{item.name}</h2>
          <p className="description">{item.description}</p>

          {/* PREÇO */}
          <div className="price-highlight">
            R$ {item.price.toFixed(2).replace(".", ",")}
          </div>

          {/* QUANTIDADE */}
          <div className="qty-row">
            <button
              className="qty-btn"
              onClick={() => setQty(Math.max(1, qty - 1))}
            >
              -
            </button>

            <span className="qty-number">{qty}</span>

            <button
              className="qty-btn"
              onClick={() => setQty(qty + 1)}
            >
              +
            </button>
          </div>

          {/* BOTÃO ADICIONAR */}
          <button
            className="btn-add"
            onClick={() => {
              onAdd(item, qty);
              onClose();
            }}
          >
            Adicionar • R$ {(item.price * qty).toFixed(2).replace(".", ",")}
          </button>
        </div>

      </div>
    </div>
  );
}
