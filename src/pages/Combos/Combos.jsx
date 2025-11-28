import React, { useMemo, useState } from "react";
import "./Combos.scss";

// MODAIS
import ModalComboDelete from "./ModalComboDelete/ModalComboDelete.jsx";
import ModalComboDetails from "./ModalComboDetails/ModalComboDetails.jsx";
import ModalComboForm from "./ModalComboForm/ModalComboForm.jsx";

// IMAGENS (pode trocar pelas que quiser)
import burgerImg from "../../assets/img/produtos/burger.png";
import pizzaImg from "../../assets/img/produtos/pizza.png";
import milkImg from "../../assets/img/produtos/milk.png";
import sorveteImg from "../../assets/img/produtos/sorvete.png";
import acaiImg from "../../assets/img/produtos/acai.png";
import batataImg from "../../assets/img/produtos/batata.png";
import bebidaImg from "../../assets/img/produtos/bebidas.png";

// ---------------- MOCK DE PRODUTOS DISPONÍVEIS PARA COMBOS ----------------

const MOCK_PRODUCTS = [
  {
    id: 1,
    image: burgerImg,
    name: "Bacon Burger Deluxe",
    category: "Hambúrgueres",
    price: 24.9,
    description: "Hambúrguer artesanal com bacon crocante.",
  },
  {
    id: 2,
    image: pizzaImg,
    name: "Pizza Margherita",
    category: "Pizzas",
    price: 32.9,
    description: "Pizza italiana com manjericão fresco.",
  },
  {
    id: 3,
    image: milkImg,
    name: "Milk-shake Morango",
    category: "Milk-shakes",
    price: 18.9,
    description: "Milk-shake de morango com creme especial.",
  },
  {
    id: 4,
    image: sorveteImg,
    name: "Sorvete Baunilha",
    category: "Sorvetes",
    price: 12.9,
    description: "Sorvete artesanal de baunilha.",
  },
  {
    id: 5,
    image: acaiImg,
    name: "Açaí na Tigela",
    category: "Açaí",
    price: 16.9,
    description: "Tigela de açaí com frutas frescas.",
  },
  {
    id: 6,
    image: batataImg,
    name: "Batata Frita Grande",
    category: "Porções",
    price: 14.9,
    description: "Batatas fritas crocantes.",
  },
  {
    id: 7,
    image: bebidaImg,
    name: "Refrigerante Lata",
    category: "Bebidas",
    price: 7.5,
    description: "Lata 350ml gelada.",
  },
];

// helper para criar combo já com preço calculado
const buildCombo = ({
  id,
  name,
  image,
  category,
  description,
  productIds,
  discountType = "none", // "none" | "percent" | "value"
  discountValue = 0,
  active = true,
  orders = 0,
}) => {
  const items = productIds
    .map((pid) => MOCK_PRODUCTS.find((p) => p.id === pid))
    .filter(Boolean);

  const originalPrice = items.reduce((sum, p) => sum + p.price, 0);

  let finalPrice = originalPrice;
  let discountAmount = 0;

  if (discountType === "percent") {
    discountAmount = (originalPrice * discountValue) / 100;
  } else if (discountType === "value") {
    discountAmount = discountValue;
  }

  finalPrice = originalPrice - discountAmount;
  if (finalPrice < 0) finalPrice = 0;

  return {
    id,
    name,
    image,
    category,
    description,
    items,
    originalPrice,
    finalPrice,
    discountType,
    discountValue,
    active,
    orders,
  };
};

const initialCombos = [
  buildCombo({
    id: 1,
    name: "Combo Burger Deluxe",
    image: burgerImg,
    category: "Hambúrgueres",
    description: "Hambúrguer artesanal + batata frita + refrigerante 500ml",
    productIds: [1, 6, 7],
    discountType: "value",
    discountValue: 5,
    active: true,
    orders: 120,
  }),
  buildCombo({
    id: 2,
    name: "Combo Pizza + Refri",
    image: pizzaImg,
    category: "Pizzas",
    description: "Pizza média (até 2 sabores) + refrigerante 1L",
    productIds: [2, 7],
    discountType: "percent",
    discountValue: 10,
    active: true,
    orders: 80,
  }),
  buildCombo({
    id: 3,
    name: "Combo Doce",
    image: milkImg,
    category: "Milk-shakes",
    description: "Milk-shake grande + sobremesa especial do dia",
    productIds: [3, 4],
    discountType: "none",
    discountValue: 0,
    active: true,
    orders: 40,
  }),
];

const Combos = ({ searchQuery }) => {
  const [combos, setCombos] = useState(initialCombos);
  const [viewMode, setViewMode] = useState("grid");

  // filtros
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("bestseller");

  // modais
  const [deleteModal, setDeleteModal] = useState(null);
  const [detailsModal, setDetailsModal] = useState(null);
  const [comboFormModal, setComboFormModal] = useState(null);

  // categorias disponíveis (usando categorias existentes dos produtos)
  const comboCategories = useMemo(() => {
    const set = new Set(combos.map((c) => c.category));
    return ["Todas as Categorias", ...Array.from(set)];
  }, [combos]);

  // LISTA FILTRADA
  const filteredCombos = useMemo(() => {
    let list = [...combos];

    if (categoryFilter !== "all") {
      list = list.filter((c) => c.category === categoryFilter);
    }

    if (statusFilter !== "all") {
      list = list.filter((c) =>
        statusFilter === "active" ? c.active : !c.active
      );
    }

    // aqui poderia usar searchQuery vindo do header se um dia quiser
    if (searchQuery?.trim()) {
      list = list.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // ordenação
    if (sortBy === "bestseller") {
      list.sort((a, b) => b.orders - a.orders);
    }
    if (sortBy === "name-asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortBy === "name-desc") {
      list.sort((a, b) => b.name.localeCompare(a.name));
    }
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.finalPrice - b.finalPrice);
    }
    if (sortBy === "price-desc") {
      list.sort((a, b) => b.finalPrice - a.finalPrice);
    }

    return list;
  }, [combos, categoryFilter, statusFilter, sortBy, searchQuery]);

  // toggle status
  const toggleStatus = (id) => {
    setCombos((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, active: !c.active } : c
      )
    );
  };

  // delete combo
  const handleDelete = () => {
    setCombos((prev) => prev.filter((c) => c.id !== deleteModal.id));
    setDeleteModal(null);
  };

  // salvar combo (add/edit)
  const handleSaveCombo = (data) => {
    // data vem do modal com:
    // { name, category, description, active, items, discountType, discountValue, preview, image }

    const originalPrice = data.items.reduce(
      (sum, item) => sum + item.price,
      0
    );

    let discountAmount = 0;
    if (data.discountType === "percent") {
      discountAmount = (originalPrice * data.discountValue) / 100;
    } else if (data.discountType === "value") {
      discountAmount = data.discountValue;
    }

    let finalPrice = originalPrice - discountAmount;
    if (finalPrice < 0) finalPrice = 0;

    if (comboFormModal?.mode === "add") {
      const newCombo = {
        id: Date.now(),
        name: data.name,
        category: data.category,
        description: data.description,
        image: data.preview || burgerImg,
        items: data.items,
        active: data.active,
        discountType: data.discountType,
        discountValue: data.discountValue,
        originalPrice,
        finalPrice,
        orders: 0,
      };

      setCombos((prev) => [...prev, newCombo]);
    } else {
      setCombos((prev) =>
        prev.map((c) =>
          c.id === comboFormModal.combo.id
            ? {
                ...c,
                name: data.name,
                category: data.category,
                description: data.description,
                image: data.preview || c.image,
                items: data.items,
                active: data.active,
                discountType: data.discountType,
                discountValue: data.discountValue,
                originalPrice,
                finalPrice,
              }
            : c
        )
      );
    }

    setComboFormModal(null);
  };

  return (
    <div className="combos-page">
      {/* HEADER */}
      <div className="combos-header">
        <h1>Combos do Cardápio</h1>

        <button
          className="btn-add"
          onClick={() =>
            setComboFormModal({ mode: "add", combo: null })
          }
        >
          <span className="add-icon" />
          Adicionar Combo
        </button>
      </div>

      {/* FILTROS */}
      <div className="combos-filtros">
        <div className="filtro-item">
          <label>Categoria</label>
          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(
                e.target.value === "Todas as Categorias"
                  ? "all"
                  : e.target.value
              )
            }
          >
            {comboCategories.map((c) => (
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
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
          </select>
        </div>

        <div className="filtro-item">
          <label>Ordenar por</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="bestseller">Mais vendidos</option>
            <option value="name-asc">Nome A-Z</option>
            <option value="name-desc">Nome Z-A</option>
            <option value="price-asc">Preço menor-maior</option>
            <option value="price-desc">Preço maior-menor</option>
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

      {/* GRID */}
      {viewMode === "grid" && (
        <div className="combos-grid">
          {filteredCombos.map((combo) => (
            <div key={combo.id} className="combo-card">

              <div
                className="combo-img"
                onClick={() => setDetailsModal(combo)}
              >
                <img src={combo.image} alt={combo.name} />
              </div>

              <div className="combo-info">
                <h3>{combo.name}</h3>
                <p className="combo-desc">{combo.description}</p>

                <p className="combo-items">
                  <span className="dot" />
                  {combo.items.length} itens inclusos
                </p>

                <div className="combo-prices">
                  {combo.originalPrice !== combo.finalPrice && (
                    <span className="old-price">
                      De{" "}
                      {combo.originalPrice.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  )}

                  <span className="final-price">
                    Por{" "}
                    {combo.finalPrice.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>

                <span
                  className={`status ${combo.active ? "ativo" : "inativo"}`}
                >
                  {combo.active ? "Ativo" : "Inativo"}
                </span>
              </div>

              <div className="combo-actions">
                <div className="combo-actions-2">
                  <button
                    className="btn-editar"
                    onClick={() =>
                      setComboFormModal({ mode: "edit", combo })
                    }
                  >
                    <span className="icon-editar" />
                    Editar
                  </button>

                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={combo.active}
                      onChange={() => toggleStatus(combo.id)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="combo-actions-delete">
                  <button
                    className="btn-delete"
                    onClick={() => setDeleteModal(combo)}
                  >
                    <span className="icon-trash" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* LIST / TABLE */}
      {viewMode === "list" && (
        <table className="combos-table">
          <thead>
            <tr>
              <th>Combo</th>
              <th>Categoria</th>
              <th>Itens</th>
              <th>Preço</th>
              <th>Status</th>
              <th style={{ width: "180px" }}>Ações</th>
            </tr>
          </thead>

          <tbody>
            {filteredCombos.map((combo) => (
              <tr key={combo.id}>
                <td
                  className="td-combo"
                  onClick={() => setDetailsModal(combo)}
                >
                  <img src={combo.image} alt={combo.name} />
                  <div>
                    <strong>{combo.name}</strong>
                    <span className="table-desc">
                      {combo.description}
                    </span>
                  </div>
                </td>

                <td>{combo.category}</td>

                <td>{combo.items.length} itens</td>

<td className="td-preco">
  <div className="price-wrapper">
    {combo.originalPrice !== combo.finalPrice && (
      <span className="old-price">
        {combo.originalPrice.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </span>
    )}

    <span className="final-price">
      {combo.finalPrice.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}
    </span>
  </div>
</td>


                <td>
                  <span
                    className={`status ${combo.active ? "ativo" : "inativo"}`}
                  >
                    {combo.active ? "Ativo" : "Inativo"}
                  </span>
                </td>

                <td className="td-actions">
                  <button
                    className="btn-editar"
                    onClick={() =>
                      setComboFormModal({ mode: "edit", combo })
                    }
                  >
                    <span className="icon-editar" />
                    Editar
                  </button>

                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={combo.active}
                      onChange={() => toggleStatus(combo.id)}
                    />
                    <span className="slider"></span>
                  </label>

                  <button
                    className="btn-delete"
                    onClick={() => setDeleteModal(combo)}
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
        <ModalComboDelete
          open={true}
          combo={deleteModal}
          onClose={() => setDeleteModal(null)}
          onConfirm={handleDelete}
        />
      )}

      {detailsModal && (
        <ModalComboDetails
          open={true}
          combo={detailsModal}
          onClose={() => setDetailsModal(null)}
        />
      )}

      {comboFormModal && (
        <ModalComboForm
          open={true}
          combo={comboFormModal.combo}
          mode={comboFormModal.mode}
          onClose={() => setComboFormModal(null)}
          onSave={handleSaveCombo}
          products={MOCK_PRODUCTS}
          categories={comboCategories.filter(
            (c) => c !== "Todas as Categorias"
          )}
        />
      )}
    </div>
  );
};

export default Combos;
