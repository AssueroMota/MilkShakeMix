import React from "react";
import "./ModalDetails.scss";

const ModalDetails = ({ open, product, onClose }) => {
  if (!open || !product) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-details-card">

        {/* HEADER */}
        <div className="details-header">
          <h2>Detalhes do Produto</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* BODY */}
        <div className="details-body">

          {/* IMAGEM */}
          <div className="details-image">
            <img src={product.image} alt={product.name} />
          </div>

          {/* INFO */}
          <div className="details-info">
            <h3 className="details-title">{product.name}</h3>

            <p><strong>Categoria:</strong> {product.category}</p>
            <p>
              <strong>Preço:</strong>{" "}
              {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>

            <p className="status-line">
              <strong>Status:</strong>
              <span className={`status-chip ${product.active ? "active" : "inactive"}`}>
                {product.active ? "Ativo" : "Inativo"}
              </span>
            </p>

            <p className="description-title">Descrição</p>
            <p className="description-text">{product.description}</p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="details-footer">
          <button className="btn-close" onClick={onClose}>Fechar</button>
        </div>

      </div>
    </div>
  );
};

export default ModalDetails;
