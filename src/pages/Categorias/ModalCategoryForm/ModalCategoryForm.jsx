import React, { useState, useEffect } from "react";
import "./ModalCategoryForm.scss";

const ModalCategoryForm = ({ open, category, mode, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    active: true,
    image: null,
    preview: null,
  });

  useEffect(() => {
    if (category) {
      setForm({
        name: category.name,
        active: category.active,
        image: null,
        preview: category.image,
      });
    }
  }, [category]);

  if (!open) return null;

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      image: file,
      preview: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      name: form.name,
      active: form.active,
      image: form.image,
      preview: form.preview,
    });
  };

  return (
    <div className="modal-overlay fade-in">
      <div className="modal-form slide-up">

        {/* HEADER */}
        <div className="modal-form-header">
          <h2>
            {mode === "add" ? "Adicionar Categoria" : "Editar Categoria"}
          </h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* BODY */}
        <form className="modal-form-body" onSubmit={handleSubmit}>
          
          {/* LEFT - IMAGE */}
          <div className="form-left">
            <div className="image-box">
              {form.preview ? (
                <img src={form.preview} alt="preview" />
              ) : (
                <span className="placeholder">Sem Imagem</span>
              )}

              <label className="btn-upload">
                Selecionar Imagem
                <input type="file" accept="image/*" onChange={onFileChange} />
              </label>
            </div>

            <div className="switch-box">
              <label>Status</label>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, active: e.target.checked }))
                  }
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          {/* RIGHT - NAME */}
          <div className="form-right">
            <div className="form-group">
              <label>Nome da Categoria</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>
          </div>

        </form>

        {/* FOOTER */}
        <div className="modal-form-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-primary" onClick={handleSubmit}>
            Salvar
          </button>
        </div>

      </div>
    </div>
  );
};

export default ModalCategoryForm;
