import React, { useState, useEffect } from "react";
import "./ModalProductForm.scss";

const ModalProductForm = ({ open, product, mode, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    active: true,
    description: "",
    image: null,
    preview: null,
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        category: product.category,
        price: product.price.toFixed(2).replace(".", ","),
        active: product.active,
        description: product.description || "",
        image: null,
        preview: product.image,
      });
    }
  }, [product]);

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

  const formatPriceInput = (value) => {
    let digits = value.replace(/\D/g, "");
    let float = (parseInt(digits, 10) / 100).toFixed(2);
    return float.replace(".", ",");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalPrice = parseFloat(form.price.replace(",", "."));

    onSave({
      name: form.name,
      category: form.category,
      price: finalPrice,
      active: form.active,
      description: form.description,
      image: form.image,
      preview: form.preview,
    });
  };

  return (
    <div className="modal-overlay fade-in">
      <div className="modal-form slide-up">

        {/* HEADER */}
        <div className="modal-form-header">
          <h2>{mode === "add" ? "Adicionar Produto" : "Editar Produto"}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* BODY */}
        <form className="modal-form-body" onSubmit={handleSubmit}>

          {/* LEFT COLUMN - IMAGE */}
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

          {/* RIGHT COLUMN - FORM */}
          <div className="form-right">

            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Categoria</label>
              <input
                type="text"
                value={form.category}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, category: e.target.value }))
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Preço</label>
              <input
                type="text"
                value={form.price}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    price: formatPriceInput(e.target.value),
                  }))
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Descrição</label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
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

export default ModalProductForm;
