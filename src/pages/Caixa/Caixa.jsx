// src/pages/Caixa/Caixa.jsx  (ou o caminho que você estiver usando)
import React, { useMemo, useState } from "react";
import "./Caixa.scss";

// IMAGENS DAS CATEGORIAS / PRODUTOS
import burgerImg from "../../assets/img/produtos/burger.png";
import pizzaImg from "../../assets/img/produtos/pizza.png";
import milkImg from "../../assets/img/produtos/milk.png";
import sorveteImg from "../../assets/img/produtos/sorvete.png";
import acaiImg from "../../assets/img/produtos/acai.png";
import batataImg from "../../assets/img/produtos/batata.png";
import bebidaImg from "../../assets/img/produtos/bebidas.png";

/* ---------------------- HELPERS DE NÚMERO / MOEDA ---------------------- */

// Converte string "10,50" / "10.50" / "R$ 10,50" => number 10.5
function parseBRNumber(str) {
  if (!str) return 0;
  const cleaned = String(str)
    .replace(/[^\d,.-]/g, "") // remove tudo que não é número, vírgula, ponto ou sinal
    .replace(/\./g, "") // remove pontos de milhar
    .replace(",", "."); // troca vírgula decimal por ponto

  const value = parseFloat(cleaned);
  return isNaN(value) ? 0 : value;
}

// Formata um number para moeda BR
function formatCurrency(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// Formata valor digitado em input de moeda: "5" => "0,05" => "0,50" => "5,00" etc
function formatCurrencyInput(str) {
  const onlyDigits = String(str).replace(/\D/g, ""); // só números
  if (!onlyDigits) return "";

  const int = parseInt(onlyDigits, 10);
  const cents = (int / 100).toFixed(2); // "12.34"
  return cents.replace(".", ","); // "12,34"
}

/* -------------------------- DADOS MOCKADOS -------------------------- */

const CATEGORIES = [
  { id: 1, image: burgerImg, name: "Hambúrgueres", active: true },
  { id: 2, image: pizzaImg, name: "Pizzas", active: true },
  { id: 3, image: milkImg, name: "Milk-shakes", active: true },
  { id: 4, image: sorveteImg, name: "Sorvetes", active: true },
  { id: 5, image: acaiImg, name: "Açaí", active: true },
  { id: 6, image: batataImg, name: "Porções", active: true },
  { id: 7, image: bebidaImg, name: "Bebidas", active: true },
];

// Produtos de exemplo (você pode aumentar a lista depois)
const PRODUCTS = [
  {
    id: 101,
    categoryId: 1,
    name: "Hambúrguer Artesanal",
    price: 24.9,
    image: burgerImg,
  },
  {
    id: 102,
    categoryId: 1,
    name: "Burger Pepperoni",
    price: 34.9,
    image: burgerImg,
  },
  {
    id: 201,
    categoryId: 2,
    name: "Pizza Pepperoni",
    price: 39.9,
    image: pizzaImg,
  },
  {
    id: 202,
    categoryId: 2,
    name: "Pizza Margherita",
    price: 32.9,
    image: pizzaImg,
  },
  {
    id: 301,
    categoryId: 3,
    name: "Milk Shake Morango",
    price: 17.9,
    image: milkImg,
  },
  {
    id: 302,
    categoryId: 3,
    name: "Milk Shake Chocolate",
    price: 18.9,
    image: milkImg,
  },
  {
    id: 401,
    categoryId: 4,
    name: "Sorvete Baunilha",
    price: 12.9,
    image: sorveteImg,
  },
  {
    id: 402,
    categoryId: 4,
    name: "Sorvete Napolitano",
    price: 14.9,
    image: sorveteImg,
  },
  {
    id: 501,
    categoryId: 5,
    name: "Açaí Tradicional",
    price: 16.9,
    image: acaiImg,
  },
  {
    id: 601,
    categoryId: 6,
    name: "Batata Frita Grande",
    price: 14.9,
    image: batataImg,
  },
  {
    id: 701,
    categoryId: 7,
    name: "Refrigerante Lata",
    price: 7.5,
    image: bebidaImg,
  },
];

/** Cupoms de exemplo:
 *  PROMO10 => 10% de desconto
 *  DESC5   => R$ 5,00 de desconto
 */
const COUPONS = {
  PROMO10: { type: "percent", value: 10, label: "10% OFF" },
  DESC5: { type: "value", value: 5, label: "R$ 5,00 OFF" },
};

const PAYMENT_LABELS = {
  pix: "PIX",
  money: "Dinheiro",
  debit: "Débito",
  credit: "Crédito",
};

/* ------------------------------------------------------------------- */

export default function Caixa() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    CATEGORIES[0]?.id || null
  );
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Carrinho
  const [cart, setCart] = useState([]);
  const [note, setNote] = useState("");

  // Valores / descontos
  const [deliveryFeeInput, setDeliveryFeeInput] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const [discountPercentInput, setDiscountPercentInput] = useState("");
  const [discountValueInput, setDiscountValueInput] = useState("");

  // Pagamento
  const [paymentMethod, setPaymentMethod] = useState(null);

  // Nota fiscal / recibo
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastSale, setLastSale] = useState(null);

  /* ------------------------- FILTRO DE PRODUTOS ------------------------- */

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchCategory =
        !selectedCategoryId || product.categoryId === selectedCategoryId;

      const matchSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [selectedCategoryId, searchTerm]);

  /* --------------------------- CARRINHO --------------------------- */

  function handleAddToCart(product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
  }

  function handleChangeQuantity(productId, delta) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function handleRemoveFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }

  function handleClearCart() {
    setCart([]);
    setNote("");
  }

  /* ----------------------- CUPOM / DESCONTOS ----------------------- */

  function handleApplyCoupon() {
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      setAppliedCoupon(null);
      return;
    }

    const coupon = COUPONS[code];
    if (!coupon) {
      setAppliedCoupon(null);
      alert("Cupom inválido ou não cadastrado.");
      return;
    }

    setAppliedCoupon({ code, ...coupon });
    // opcional: limpar input
    // setCouponInput("");
  }

  /* ------------------------- CÁLCULO TOTAIS ------------------------- */

  const totals = useMemo(() => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const deliveryFee = parseBRNumber(deliveryFeeInput);
    const discountPercent = parseBRNumber(discountPercentInput); // ex: 10 => 10%
    const discountValueManual = parseBRNumber(discountValueInput);

    // desconto em % sobre o subtotal
    const discountFromPercent = (subtotal * discountPercent) / 100;

    // desconto por cupom
    let couponDiscountValue = 0;
    if (appliedCoupon) {
      if (appliedCoupon.type === "percent") {
        couponDiscountValue = (subtotal * appliedCoupon.value) / 100;
      } else if (appliedCoupon.type === "value") {
        couponDiscountValue = appliedCoupon.value;
      }
    }

    const totalDiscounts =
      discountFromPercent + discountValueManual + couponDiscountValue;

    let total = subtotal + deliveryFee - totalDiscounts;
    if (total < 0) total = 0;

    return {
      subtotal,
      deliveryFee,
      discountPercent,
      discountFromPercent,
      discountValueManual,
      couponDiscountValue,
      totalDiscounts,
      total,
    };
  }, [
    cart,
    deliveryFeeInput,
    discountPercentInput,
    discountValueInput,
    appliedCoupon,
  ]);

  /* --------------------------- FINALIZAR --------------------------- */

  function handleFinalizeSale() {
    if (cart.length === 0) {
      alert("Adicione itens ao carrinho antes de finalizar.");
      return;
    }

    if (!paymentMethod) {
      alert("Selecione uma forma de pagamento.");
      return;
    }

    const sale = {
      id: Date.now(),
      items: cart,
      note,
      paymentMethod,
      ...totals,
      coupon: appliedCoupon,
      createdAt: new Date(),
    };

    setLastSale(sale);
    setShowReceipt(true);

    // limpa tela para próximo pedido
    setCart([]);
    setNote("");
    setDeliveryFeeInput("");
    setCouponInput("");
    setAppliedCoupon(null);
    setDiscountPercentInput("");
    setDiscountValueInput("");
    setPaymentMethod(null);
  }

  function handlePrintReceipt() {
    window.print();
  }

  /* ---------------------- CATEGORIAS / UI LÓGICA ---------------------- */

  function handleSelectCategory(id) {
    // Se clicar na mesma → desmarca
    if (selectedCategoryId === id) {
      setSelectedCategoryId(null);  // limpa filtro
    } else {
      setSelectedCategoryId(id);
    }

    setShowAllCategories(false);
  }


  /* ------------------------------------------------------------------- */

  return (
    <div className="caixa-page">
      {/* COLUNA ESQUERDA: PRODUTOS */}
      <div className="caixa-left">
        {/* Busca + botão ver todas categorias */}
        <div className="caixa-search-row">
          <input
            className="caixa-search-input"
            type="text"
            placeholder="Buscar produto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            type="button"
            className="btn-all-categories"
            onClick={() => setShowAllCategories((prev) => !prev)}
          >
            {showAllCategories ? "Fechar categorias" : "Ver todas categorias"}
          </button>
        </div>

        {/* Lista vertical de categorias (modo ver todas) */}
        {showAllCategories && (
          <div className="caixa-category-list">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`category-list-item ${selectedCategoryId === cat.id ? "active" : ""
                  }`}
                onClick={() => handleSelectCategory(cat.id)}
              >
                <img src={cat.image} alt={cat.name} />
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Carrossel de categorias (só aparece quando NÃO está no modo ver todas) */}
        {!showAllCategories && (
          <div className="caixa-category-carousel">
            <div className="carousel-track">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`carousel-item ${selectedCategoryId === cat.id ? "active" : ""
                    }`}
                  onClick={() => handleSelectCategory(cat.id)}
                >
                  <div className="carousel-img-wrapper">
                    <img src={cat.image} alt={cat.name} />
                  </div>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}


        {/* GRID DE PRODUTOS */}
        <div className="caixa-products-grid">
          {filteredProducts.length === 0 ? (
            <div className="no-products">
              Nenhum produto encontrado para essa busca.
            </div>
          ) : (
            filteredProducts.map((product) => {
              const isInCart = cart.some((c) => c.id === product.id);

              return (
                <button
                  key={product.id}
                  type="button"
                  className={`product-card ${isInCart ? "added" : ""}`}
                  onClick={() => handleAddToCart(product)}
                >
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>

                  <div className="product-info">
                    <h3>{product.name}</h3>

                    <span className="product-price">
                      {formatCurrency(product.price)}
                    </span>

                    {isInCart && (
                      <span className="product-added-tag">Já no carrinho ✓</span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>


      </div>

      {/* COLUNA CENTRAL: PEDIDO ATUAL */}
      <div className="caixa-center">
        <div className="order-card">
          <h2>Pedido Atual</h2>

          <div className="order-items">
            {cart.length === 0 && (
              <p className="order-empty">Nenhum item adicionado</p>
            )}

            {cart.map((item) => (
              <div key={item.id} className="order-item-v2">

                {/* --- Linha Superior --- */}
                <div className="order-item-header">
                  <div className="header-left">
                    <img src={item.image} alt={item.name} />
                    <span className="item-title">{item.name}</span>
                  </div>

                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    ×
                  </button>
                </div>

                {/* --- Linha Inferior --- */}
                <div className="order-item-footer">
                  <div className="qty-box">
                    <button onClick={() => handleChangeQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleChangeQuantity(item.id, +1)}>+</button>
                  </div>

                  <span className="unit-price">{formatCurrency(item.price)}</span>

                  <span className="total-price">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>



          <textarea
            className="order-notes"
            placeholder="Observações do pedido..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <button
            type="button"
            className="btn-clear-order"
            onClick={handleClearCart}
          >
            Limpar Carrinho
          </button>
        </div>
      </div>

      {/* COLUNA DIREITA: FINALIZAÇÃO */}
      <div className="caixa-right">
        <div className="checkout-card">
          <h2>Finalização</h2>

          <div className="checkout-section">
            <div className="checkout-row">
              <span>Subtotal:</span>
              <strong>{formatCurrency(totals.subtotal)}</strong>
            </div>

            <label className="checkout-field">
              <span>Taxa de Entrega (opcional)</span>
              <input
                type="text"
                placeholder="Ex: 5,00"
                value={deliveryFeeInput}
                onChange={(e) =>
                  setDeliveryFeeInput(formatCurrencyInput(e.target.value))
                }
              />
            </label>

            <label className="checkout-field">
              <span>Cupom de Desconto</span>
              <div className="coupon-row">
                <input
                  type="text"
                  placeholder="Digite o cupom"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleApplyCoupon();
                    }
                  }}
                />
                <button
                  type="button"
                  className="btn-apply-coupon"
                  onClick={handleApplyCoupon}
                >
                  Aplicar
                </button>
              </div>
              {appliedCoupon && (
                <small className="coupon-applied">
                  Cupom aplicado: <strong>{appliedCoupon.code}</strong> (
                  {appliedCoupon.label})
                </small>
              )}
            </label>

            <label className="checkout-field">
              <span>Desconto Manual (%)</span>
              <input
                type="text"
                placeholder="Ex: 10"
                value={discountPercentInput}
                onChange={(e) =>
                  setDiscountPercentInput(
                    e.target.value.replace(/[^\d,]/g, "")
                  )
                }
              />
            </label>

            <label className="checkout-field">
              <span>Desconto Manual (R$)</span>
              <input
                type="text"
                placeholder="Ex: 5,00"
                value={discountValueInput}
                onChange={(e) =>
                  setDiscountValueInput(formatCurrencyInput(e.target.value))
                }
              />
            </label>
          </div>

          {/* RESUMO DOS DESCONTOS */}
          <div className="checkout-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatCurrency(totals.subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Taxa de Entrega</span>
              <span>{formatCurrency(totals.deliveryFee)}</span>
            </div>
            {appliedCoupon && (
              <div className="summary-row discount">
                <span>Cupom ({appliedCoupon.code})</span>
                <span>- {formatCurrency(totals.couponDiscountValue)}</span>
              </div>
            )}
            {totals.discountFromPercent > 0 && (
              <div className="summary-row discount">
                <span>Desc. Manual (%)</span>
                <span>- {formatCurrency(totals.discountFromPercent)}</span>
              </div>
            )}
            {totals.discountValueManual > 0 && (
              <div className="summary-row discount">
                <span>Desc. Manual (R$)</span>
                <span>- {formatCurrency(totals.discountValueManual)}</span>
              </div>
            )}

            <div className="summary-total-row">
              <div>
                <span className="label">TOTAL FINAL:</span>
              </div>
              <div className="value">
                <span>{formatCurrency(totals.total)}</span>
              </div>
            </div>
          </div>

          {/* FORMAS DE PAGAMENTO */}
          <div className="checkout-payment">
            <span className="payment-title">Forma de Pagamento: </span>

            <div className="payment-grid">
              <button
                type="button"
                className={`payment-btn ${paymentMethod === "pix" ? "selected" : ""
                  }`}
                onClick={() => setPaymentMethod("pix")}
              >
                PIX
              </button>
              <button
                type="button"
                className={`payment-btn ${paymentMethod === "money" ? "selected" : ""
                  }`}
                onClick={() => setPaymentMethod("money")}
              >
                Dinheiro
              </button>
              <button
                type="button"
                className={`payment-btn ${paymentMethod === "debit" ? "selected" : ""
                  }`}
                onClick={() => setPaymentMethod("debit")}
              >
                Débito
              </button>
              <button
                type="button"
                className={`payment-btn ${paymentMethod === "credit" ? "selected" : ""
                  }`}
                onClick={() => setPaymentMethod("credit")}
              >
                Crédito
              </button>
            </div>
          </div>

          <button
            type="button"
            className="btn-finish-sale"
            onClick={handleFinalizeSale}
          >
            Finalizar Venda
          </button>
        </div>
      </div>

      {/* MODAL DE RECIBO / NOTA FISCAL */}
      {showReceipt && lastSale && (
        <div className="receipt-overlay">
          <div className="receipt-modal">
            <div className="receipt-paper">
              <h3>Milk Shake Mix</h3>
              <p>Caixa (PDV)</p>
              <p>
                Venda #{lastSale.id} —{" "}
                {lastSale.createdAt.toLocaleString("pt-BR")}
              </p>
              <hr />

              <div className="receipt-section">
                {lastSale.items.map((item) => (
                  <div key={item.id} className="receipt-item-row">
                    <div className="left">
                      <span className="qty">{item.quantity}x</span>
                      <span className="name">{item.name}</span>
                    </div>
                    <div className="right">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <hr />

              <div className="receipt-section">
                <div className="receipt-line">
                  <span>Subtotal</span>
                  <span>{formatCurrency(lastSale.subtotal)}</span>
                </div>
                <div className="receipt-line">
                  <span>Entrega</span>
                  <span>{formatCurrency(lastSale.deliveryFee)}</span>
                </div>

                {lastSale.coupon && lastSale.couponDiscountValue > 0 && (
                  <div className="receipt-line">
                    <span>Cupom ({lastSale.coupon.code})</span>
                    <span>- {formatCurrency(lastSale.couponDiscountValue)}</span>
                  </div>
                )}

                {lastSale.discountFromPercent > 0 && (
                  <div className="receipt-line">
                    <span>Desc. %</span>
                    <span>- {formatCurrency(lastSale.discountFromPercent)}</span>
                  </div>
                )}

                {lastSale.discountValueManual > 0 && (
                  <div className="receipt-line">
                    <span>Desc. R$</span>
                    <span>- {formatCurrency(lastSale.discountValueManual)}</span>
                  </div>
                )}

                <div className="receipt-line total">
                  <span>TOTAL</span>
                  <span>{formatCurrency(lastSale.total)}</span>
                </div>

                <div className="receipt-line">
                  <span>Pagamento</span>
                  <span>{PAYMENT_LABELS[lastSale.paymentMethod]}</span>
                </div>
              </div>

              {lastSale.note && (
                <>
                  <hr />
                  <div className="receipt-section">
                    <span className="receipt-notes-label">
                      Observações:
                    </span>
                    <p className="receipt-notes">{lastSale.note}</p>
                  </div>
                </>
              )}

              <hr />
              <p className="receipt-footer">Obrigado pela preferência!</p>
            </div>

            <div className="receipt-actions">
              <p>Deseja imprimir o comprovante?</p>
              <div className="receipt-buttons">
                <button
                  type="button"
                  className="btn-print"
                  onClick={handlePrintReceipt}
                >
                  Imprimir
                </button>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowReceipt(false)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
