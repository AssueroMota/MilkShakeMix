import React, { useMemo, useState } from "react";
import Layout from "../../components/layout/Layout";
import "./Produtos.scss";

// MODAIS
import ModalDelete from "./ModalDelete/ModalDelete";
import ModalDetails from "./ModalDetails/ModalDetails";
import ModalProductForm from "./ModalProductForm/ModalProductForm";

// IMAGENS
import burgerImg from "../../assets/img/produtos/burger.png";
import pizzaImg from "../../assets/img/produtos/pizza.png";
import milkImg from "../../assets/img/produtos/milk.png";
import sorveteImg from "../../assets/img/produtos/sorvete.png";
import acaiImg from "../../assets/img/produtos/acai.png";
import batataImg from "../../assets/img/produtos/batata.png";

const initialProducts = [
  {
    id: 1,
    image: burgerImg,
    name: "Bacon Burger Deluxe",
    category: "Hambúrgueres",
    price: 24.9,
    active: true,
    description: "Um hambúrguer artesanal com bacon crocante.",
  },
  {
    id: 2,
    image: pizzaImg,
    name: "Pizza Margherita",
    category: "Pizzas",
    price: 32.9,
    active: true,
    description: "Pizza italiana clássica com manjericão fresco.",
  },
  {
    id: 3,
    image: milkImg,
    name: "Milk-shake Morango",
    category: "Milk-shakes",
    price: 18.9,
    active: true,
    description: "Milk-shake de morango com creme especial.",
  },
  {
    id: 4,
    image: sorveteImg,
    name: "Sorvete Baunilha",
    category: "Sorvetes",
    price: 12.9,
    active: false,
    description: "Sorvete artesanal de baunilha.",
  },
  {
    id: 5,
    image: acaiImg,
    name: "Açaí na Tigela",
    category: "Açaí",
    price: 16.9,
    active: true,
    description: "Tigela de açaí com frutas frescas.",
  },
  {
    id: 6,
    image: batataImg,
    name: "Batata Frita Grande",
    category: "Porções",
    price: 14.9,
    active: true,
    description: "Porção grande de batatas crocantes.",
  },
];

const Produtos = ({ searchQuery }) => {
  const [products, setProducts] = useState(initialProducts);
  const [viewMode, setViewMode] = useState("grid");

  // FILTROS
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");

  // MODAIS
  const [deleteModal, setDeleteModal] = useState(null);
  const [detailsModal, setDetailsModal] = useState(null);
  const [productFormModal, setProductFormModal] = useState(null);

  // CATEGORIAS
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["Todas Categorias", ...Array.from(set)];
  }, [products]);

  // LISTAGEM FINAL
const filteredProducts = useMemo(() => {
  let list = [...products];

  // FILTRO POR CATEGORIA
  if (categoryFilter !== "all") {
    list = list.filter((p) => p.category === categoryFilter);
  }

  // FILTRO POR STATUS
  if (statusFilter !== "all") {
    list = list.filter((p) =>
      statusFilter === "active" ? p.active : !p.active
    );
  }

  // 🔎 FILTRO POR BUSCA (HEADER)
  if (searchQuery?.trim()) {
    list = list.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // ORDENAÇÃO
  if (sortBy === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));
  if (sortBy === "name-desc") list.sort((a, b) => b.name.localeCompare(a.name));
  if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);

  return list;
}, [products, categoryFilter, statusFilter, sortBy, searchQuery]);


  // TOGGLE STATUS
  const toggleStatus = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, active: !p.active } : p
      )
    );
  };

  // DELETE PRODUTO
  const handleDelete = () => {
    setProducts((prev) => prev.filter((p) => p.id !== deleteModal.id));
    setDeleteModal(null);
  };

  // SALVAR PRODUTO ADD/EDIT
  const handleSaveProduct = (data) => {
    if (productFormModal?.mode === "add") {
      const newProduct = {
        id: Date.now(),
        ...data,
        image: data.preview || burgerImg,
      };
      setProducts((prev) => [...prev, newProduct]);
    } else {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productFormModal.product.id
            ? { ...p, ...data, image: data.preview || p.image }
            : p
        )
      );
    }

    setProductFormModal(null);
  };

  return (
    
      <div className="produtos-page">

        {/* HEADER */}
        <div className="produtos-header">
          <h1>Produtos da Loja</h1>

          <button
            className="btn-add"
            onClick={() =>
              setProductFormModal({ mode: "add", product: null })
            }
          >
            <span className="add-icon" />
            Adicionar Produto
          </button>
        </div>

        {/* FILTROS */}
        <div className="produtos-filtros">

          <div className="filtro-item">
            <label>Categoria</label>
            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(
                  e.target.value === "Todas Categorias" ? "all" : e.target.value
                )
              }
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="filtro-item">
            <label>Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
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
              <option value="price-asc">Preço menor-maior</option>
              <option value="price-desc">Preço maior-menor</option>
            </select>
          </div>

          {/* Mudar visualização */}
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

        {/* ================= GRID VIEW ================= */}
        {viewMode === "grid" && (
          <div className="produtos-grid">
            {filteredProducts.map((p) => (
              <div key={p.id} className="produto-card">

                <div className="produto-img" onClick={() => setDetailsModal(p)}>
                  <img src={p.image} alt={p.name} />
                </div>

                <div className="produto-info">
                  <h3>{p.name}</h3>
                  <p className="categoria">{p.category}</p>

                  <p className="preco">
                    {p.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>

                  <span className={`status ${p.active ? "ativo" : "inativo"}`}>
                    {p.active ? "Ativo" : "Inativo"}
                  </span>
                </div>

                {/* AÇÕES */}
                <div className="produto-actions">
                  <div className="produto-actions-2">
                    <button
                      className="btn-editar"
                      onClick={() =>
                        setProductFormModal({ mode: "edit", product: p })
                      }
                    >
                      <span className="icon-editar" />
                      Editar
                    </button>

                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={p.active}
                        onChange={() => toggleStatus(p.id)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="produto-actions-delete">
                    <button
                      className="btn-delete"
                      onClick={() => setDeleteModal(p)}
                    >
                      <span className="icon-trash" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* ================= LIST/TABLE VIEW ================= */}
        {viewMode === "list" && (
          <table className="produtos-table">
<thead>
  <tr>
    <th>Produto</th>
    <th>Categoria</th>
    <th>Preço</th>
    <th>Status</th>
    <th style={{ width: "160px" }}>Ações</th>
  </tr>
</thead>


            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p.id}>

                  {/* IMAGEM + NOME */}
                  <td className="td-produto" onClick={() => setDetailsModal(p)}>
                    <img src={p.image} alt={p.name} />
                    <div>
                      <strong>{p.name}</strong>
                      <span className="table-desc">{p.description}</span>
                    </div>
                  </td>

                  <td>{p.category}</td>

                  <td className="td-preco">
                    {p.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>

                  <td>
                    <span className={`status ${p.active ? "ativo" : "inativo"}`}>
                      {p.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>

                  {/* AÇÕES */}
                  <td className="td-actions" onClick={(e) => e.stopPropagation()}>
                    <button
                      className="btn-editar"
                      onClick={() => {
                        e.stopPropagation();
                        setProductFormModal({ mode: "edit", product: p });
                      }}
                    >
                      <span className="icon-editar" />
                      Editar
                    </button>

                    <label className="switch" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={p.active}
                        onChange={() => toggleStatus(p.id)}
                      />
                      <span className="slider"></span>
                    </label>

                    <button
                      className="btn-delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteModal(p);
                      }}
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
            product={deleteModal}
            onClose={() => setDeleteModal(null)}
            onConfirm={handleDelete}
          />
        )}

        {detailsModal && (
          <ModalDetails
            open={true}
            product={detailsModal}
            onClose={() => setDetailsModal(null)}
          />
        )}

        {productFormModal && (
          <ModalProductForm
            open={true}
            product={productFormModal.product}
            mode={productFormModal.mode}
            onClose={() => setProductFormModal(null)}
            onSave={handleSaveProduct}
          />
        )}

      </div>
 
  );
};

export default Produtos;
