import React from "react";
import "./ModalComboDetails.scss";

const ModalComboDetails = ({ open, combo, onClose }) => {
  if (!open || !combo) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="combo-details-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="details-header">
          <h2>Detalhes do Combo</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* BODY */}
        <div className="details-body">
          {/* IMAGEM */}
          <div className="details-image">
            <img src={combo.preview || combo.image} alt={combo.name} />
          </div>

          {/* INFORMAÇÕES */}
          <div className="details-info">
            <h3 className="details-title">{combo.name}</h3>

            <p>
              <strong>Categoria:</strong> {combo.category}
            </p>

            <p>
              <strong>Produtos Inclusos:</strong> {combo.items?.length || 0} itens
            </p>

            <p>
              <strong>Preço Original:</strong>{" "}
              {Number(combo.totalOriginal || 0).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>

            <p className="price-final">
              <strong>Preço Final:</strong>{" "}
              <span>
                {Number(combo.totalFinal || 0).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </p>

            <p className="status-line">
              <strong>Status:</strong>
              <span
                className={`status-chip ${
                  combo.active ? "active" : "inactive"
                }`}
              >
                {combo.active ? "Ativo" : "Inativo"}
              </span>
            </p>

            <p className="description-title">Descrição</p>
            <p className="description-text">{combo.description}</p>
          </div>
        </div>

        {/* LISTA DE PRODUTOS */}
        <div className="details-products">
          <h4>Produtos do Combo</h4>

          <ul>
            {combo.items?.map((item) => (
              <li key={item.id}>
                <img src={item.image} alt={item.name} />
                <span>{item.name}</span>
                <span className="item-price">
                  {Number(item.price || 0).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* FOOTER */}
        <div className="details-footer">
          <button className="btn-close" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalComboDetails;
