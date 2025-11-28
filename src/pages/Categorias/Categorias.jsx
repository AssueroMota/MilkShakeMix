import React, { useMemo, useState } from "react";
import "./Categorias.scss";

// MODAIS
import ModalDelete from "./ModalDelete/ModalDelete.jsx";
import ModalDetails from "./ModalDetails/ModalDetails.jsx";
import ModalCategoryForm from "./ModalCategoryForm/ModalCategoryForm.jsx";

// IMAGENS DAS CATEGORIAS
import burgerImg from "../../assets/img/produtos/burger.png";
import pizzaImg from "../../assets/img/produtos/pizza.png";
import milkImg from "../../assets/img/produtos/milk.png";
import sorveteImg from "../../assets/img/produtos/sorvete.png";
import acaiImg from "../../assets/img/produtos/acai.png";
import batataImg from "../../assets/img/produtos/batata.png";
import bebidaImg from "../../assets/img/produtos/bebidas.png";

const initialCategories = [
  { id: 1, image: burgerImg, name: "Hambúrgueres", active: true },
  { id: 2, image: pizzaImg, name: "Pizzas", active: true },
  { id: 3, image: milkImg, name: "Milk-shakes", active: true },
  { id: 4, image: sorveteImg, name: "Sorvetes", active: true },
  { id: 5, image: acaiImg, name: "Açaí", active: true },
  { id: 6, image: batataImg, name: "Porções", active: false },
  { id: 7, image: bebidaImg, name: "Bebidas", active: true },
];

const Categorias = ({ searchQuery }) => {
  const [categories, setCategories] = useState(initialCategories);
  const [viewMode, setViewMode] = useState("grid");

  // FILTROS
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");

  // MODAIS
  const [deleteModal, setDeleteModal] = useState(null);
  const [detailsModal, setDetailsModal] = useState(null);
  const [categoryFormModal, setCategoryFormModal] = useState(null);

  // LISTA FINAL
  const filteredCategories = useMemo(() => {
    let list = [...categories];

    // FILTRO STATUS
    if (statusFilter !== "all") {
      list = list.filter((c) =>
        statusFilter === "active" ? c.active : !c.active
      );
    }

    // FILTRO BUSCA
    if (searchQuery?.trim()) {
      list = list.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // ORDENAÇÃO
    if (sortBy === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "name-desc") list.sort((a, b) => b.name.localeCompare(a.name));

    return list;
  }, [categories, statusFilter, sortBy, searchQuery]);

  // TOGGLE STATUS
  const toggleStatus = (id) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, active: !c.active } : c
      )
    );
  };

  // DELETE
  const handleDelete = () => {
    setCategories((prev) => prev.filter((c) => c.id !== deleteModal.id));
    setDeleteModal(null);
  };

  // SALVAR (add ou edit)
  const handleSaveCategory = (data) => {
    if (categoryFormModal?.mode === "add") {
      const newCategory = {
        id: Date.now(),
        ...data,
        image: data.preview || burgerImg,
      };

      setCategories((prev) => [...prev, newCategory]);
    } else {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === categoryFormModal.category.id
            ? { ...c, ...data, image: data.preview || c.image }
            : c
        )
      );
    }

    setCategoryFormModal(null);
  };

  return (
    <div className="categorias-page">

      {/* HEADER */}
      <div className="categorias-header">
        <h1>Categorias dos Itens da Loja</h1>

        <button
          className="btn-add"
          onClick={() =>
            setCategoryFormModal({ mode: "add", category: null })
          }
        >
          <span className="add-icon" />
          Adicionar Categoria
        </button>
      </div>

      {/* FILTROS */}
      <div className="categorias-filtros">

        <div className="filtro-item">
          <label>Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="active">Ativas</option>
            <option value="inactive">Inativas</option>
          </select>
        </div>

        <div className="filtro-item">
          <label>Ordenar por</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name-asc">Nome A-Z</option>
            <option value="name-desc">Nome Z-A</option>
          </select>
        </div>

        <div className="view-buttons">
          <button
            className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
          >
            <span className="grid-icon" />
          </button>

          <button
            className={`view-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
          >
            <span className="list-icon" />
          </button>
        </div>

      </div>

      {/* GRID VIEW */}
      {viewMode === "grid" && (
        <div className="categorias-grid">
          {filteredCategories.map((c) => (
            <div key={c.id} className="categoria-card">

              <div className="categoria-img" onClick={() => setDetailsModal(c)}>
                <img src={c.image} alt={c.name} />
              </div>

              <div className="categoria-info">
                <h3>{c.name}</h3>

                <span className={`status ${c.active ? "ativo" : "inativo"}`}>
                  {c.active ? "Ativa" : "Inativa"}
                </span>
              </div>

              {/* AÇÕES */}
              <div className="categoria-actions">
                <div className="categoria-actions-2">
                  <button
                    className="btn-editar"
                    onClick={() =>
                      setCategoryFormModal({ mode: "edit", category: c })
                    }
                  >
                    <span className="icon-editar" />
                    Editar
                  </button>

                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={c.active}
                      onChange={() => toggleStatus(c.id)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="categoria-actions-delete">
                  <button
                    className="btn-delete"
                    onClick={() => setDeleteModal(c)}
                  >
                    <span className="icon-trash" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === "list" && (
        <table className="categorias-table">
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Status</th>
              <th style={{ width: "160px" }}>Ações</th>
            </tr>
          </thead>

          <tbody>
            {filteredCategories.map((c) => (
              <tr key={c.id}>

                {/* IMAGEM + NOME */}
                <td className="td-categoria" onClick={() => setDetailsModal(c)}>
                  <img src={c.image} alt={c.name} />
                  <div>
                    <strong>{c.name}</strong>
                  </div>
                </td>

                <td>
                  <span className={`status ${c.active ? "ativo" : "inativo"}`}>
                    {c.active ? "Ativa" : "Inativa"}
                  </span>
                </td>

                <td className="td-actions">

                  <button
                    className="btn-editar"
                    onClick={() =>
                      setCategoryFormModal({ mode: "edit", category: c })
                    }
                  >
                    <span className="icon-editar" />
                    Editar
                  </button>

                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={c.active}
                      onChange={() => toggleStatus(c.id)}
                    />
                    <span className="slider"></span>
                  </label>

                  <button
                    className="btn-delete"
                    onClick={() => setDeleteModal(c)}
                  >
                    <span className="icon-trash" />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* MODAIS */}
      {deleteModal && (
        <ModalDelete
          open={true}
          category={deleteModal}
          onClose={() => setDeleteModal(null)}
          onConfirm={handleDelete}
        />
      )}

      {detailsModal && (
        <ModalDetails
          open={true}
          category={detailsModal}
          onClose={() => setDetailsModal(null)}
        />
      )}

      {categoryFormModal && (
        <ModalCategoryForm
          open={true}
          category={categoryFormModal.category}
          mode={categoryFormModal.mode}
          onClose={() => setCategoryFormModal(null)}
          onSave={handleSaveCategory}
        />
      )}

    </div>
  );
};

export default Categorias;
