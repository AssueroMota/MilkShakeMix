// src/pages/Cardapio/Cardapio.jsx
import React, { useState, useMemo } from "react";
import "./Cardapio.scss";
import DetailsModal from "./DetailsModal.jsx";

// IMAGENS DAS CATEGORIAS / PRODUTOS
import burgerImg from "../../assets/img/produtos/burger.png";
import pizzaImg from "../../assets/img/produtos/pizza.png";
import milkImg from "../../assets/img/produtos/milk.png";
import sorveteImg from "../../assets/img/produtos/sorvete.png";
import acaiImg from "../../assets/img/produtos/acai.png";
import batataImg from "../../assets/img/produtos/batata.png";
import bebidaImg from "../../assets/img/produtos/bebidas.png";
import CartButton from "./CartButton.jsx";
import CartSidebar from "./CartSidebar.jsx";

/* ------------------------------------------------------------------- */
/* CATEGORIAS */
const CATEGORIES = [
  { id: 1, name: "Hambúrgueres", image: burgerImg },
  { id: 2, name: "Pizzas", image: pizzaImg },
  { id: 3, name: "Milk-Shakes", image: milkImg },
  { id: 4, name: "Sorvetes", image: sorveteImg },
  { id: 5, name: "Açaí", image: acaiImg },
  { id: 6, name: "Porções", image: batataImg },
  { id: 7, name: "Bebidas", image: bebidaImg },
  { id: 8, name: "Combos", image: burgerImg },
];

/* ------------------------------------------------------------------- */
/* PRODUTOS MOCK */
const PRODUCTS = [
  {
    id: 1,
    categoryId: 1,
    name: "Hambúrguer Artesanal",
    description: "Pão brioche, carne 160g, queijo e salada.",
    price: 24.9,
    image: burgerImg,
  },
  {
    id: 2,
    categoryId: 1,
    name: "Burger Pepperoni",
    description: "Carne 160g, pepperoni e cheddar cremoso.",
    price: 34.9,
    image: burgerImg,
  },
  {
    id: 3,
    categoryId: 2,
    name: "Pizza Pepperoni",
    description: "Massa fina, molho artesanal e pepperoni.",
    price: 39.9,
    image: pizzaImg,
  },
  {
    id: 4,
    categoryId: 2,
    name: "Pizza Margherita",
    description: "Tomate, manjericão e muçarela.",
    price: 32.9,
    image: pizzaImg,
  },
  {
    id: 5,
    categoryId: 3,
    name: "Milkshake Morango",
    description: "Sorvete artesanal com morango fresco.",
    price: 17.9,
    image: milkImg,
  },
  {
    id: 6,
    categoryId: 3,
    name: "Milkshake Chocolate",
    description: "Feito com chocolate belga.",
    price: 18.9,
    image: milkImg,
  },
  {
    id: 7,
    categoryId: 4,
    name: "Sorvete Baunilha",
    description: "Sorvete cremoso artesanal.",
    price: 12.9,
    image: sorveteImg,
  },
  {
    id: 8,
    categoryId: 5,
    name: "Açaí Tradicional",
    description: "Açaí puro cremoso com granola.",
    price: 16.9,
    image: acaiImg,
  },
  {
    id: 9,
    categoryId: 6,
    name: "Batata Frita Grande",
    description: "Porção de 350g crocante.",
    price: 14.9,
    image: batataImg,
  },
  {
    id: 10,
    categoryId: 7,
    name: "Refrigerante Lata",
    description: "Lata 350ml gelada.",
    price: 7.5,
    image: bebidaImg,
  },
  {
    id: 11,
    categoryId: 8,
    name: "Combo Burger + Refri",
    description: "Hambúrguer artesanal + refrigerante.",
    price: 29.9,
    image: burgerImg,
  },
];

/* ------------------------------------------------------------------- */

export default function Cardapio() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (item, qty) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);

      if (exists) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + qty } : p
        );
      }

      return [...prev, { ...item, qty }];
    });

    setCartOpen(true);
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((prod) => {
      const matchCategory =
        !selectedCategory || prod.categoryId === selectedCategory;
      const matchSearch = prod.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, search]);

  return (
    <div className="cardapio-page">

      {/* HEADER */}
      <header className="cardapio-header">
        <div className="cardapio-header-text">
          <h1>Cardápio</h1>
          <p>Escolha uma categoria ou pesquise por um item específico.</p>
        </div>
      </header>

      {/* BUSCA */}
      <div className="cardapio-search-row">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar item..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* CATEGORIAS */}
      <section className="cardapio-section">
        <div className="section-header">
          <h2>Categorias</h2>
          {selectedCategory && (
            <button
              className="btn-clear-filter"
              onClick={() => setSelectedCategory(null)}
            >
              Limpar filtro
            </button>
          )}
        </div>

        <div className="categories-row">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`category-item ${selectedCategory === cat.id ? "active" : ""
                }`}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === cat.id ? null : cat.id
                )
              }
            >
              <div className="category-thumb">
                <img src={cat.image} alt={cat.name} />
              </div>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* PRODUTOS */}
      <section className="cardapio-section">
        <div className="section-header">
          <h2>Itens do cardápio</h2>
          <span className="items-count">{filteredProducts.length} itens</span>
        </div>

        <div className="products-grid">
          {filteredProducts.length === 0 ? (
            <p className="no-products">Nenhum item encontrado.</p>
          ) : (
            filteredProducts.map((prod) => {
              const inCart = cart.some((c) => c.id === prod.id);

              return (
                <article
                  key={prod.id}
                  className={`product-card ${inCart ? "in-cart" : ""}`}
                  onClick={() => setSelectedItem(prod)}
                >
                  <div className="product-media">
                    <img src={prod.image} alt={prod.name} />
                  </div>

                  <div className="product-body">
                    <h3>{prod.name}</h3>
                    <p className="description">{prod.description}</p>

                    <div className="product-footer">
                      <span className="price">
                        R$ {prod.price.toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                  </div>

                  {/* BADGE VISUAL */}
                  {inCart && <div className="in-cart-badge">Já no carrinho ✓</div>}
                </article>
              );
            })
          )}
        </div>
      </section>

      {/* MODAL DETALHES */}
      {selectedItem && (
        <DetailsModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAdd={addToCart}
        />
      )}

      <CartButton
        count={cart.reduce((acc, item) => acc + item.qty, 0)}
        onClick={() => setCartOpen(true)}
      />

      <CartSidebar
        open={cartOpen}
        cart={cart}
        setCart={setCart}
        onClose={() => setCartOpen(false)}
      />


    </div>
  );
}
