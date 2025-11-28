import React from "react";
import "./ModalComboDelete.scss";

const ModalComboDelete = ({ open, onClose, onConfirm, combo }) => {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-delete" onClick={(e) => e.stopPropagation()}>

        <h2>Excluir Combo</h2>

        <p>
          Tem certeza que deseja excluir o combo{" "}
          <strong>{combo?.name}</strong> do cardápio?
        </p>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>

          <button className="btn-confirm" onClick={onConfirm}>
            Excluir
          </button>
        </div>

      </div>
    </div>
  );
};

export default ModalComboDelete;
