import React from "react";
import "./CartSidebar.scss";

export default function CartSidebar({ open, cart, setCart, onClose }) {
  const removeItem = (id) =>
    setCart((prev) => prev.filter((p) => p.id !== id));

  const increment = (id) =>
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p))
    );

  const decrement = (id) =>
    setCart((prev) =>
      prev.map((p) =>
        p.id === id && p.qty > 1 ? { ...p, qty: p.qty - 1 } : p
      )
    );

  const clearAll = () => setCart([]);

  return (
    <div className={`cart-sidebar ${open ? "open" : ""}`}>
      <div className="cart-header">
        <h3>Pedido Atual</h3>
        <button onClick={onClose}>✕</button>
      </div>

      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />

            <div className="info">
              <h4>{item.name}</h4>
              <div className="qty-row">
                <button onClick={() => decrement(item.id)}>−</button>
                <span>{item.qty}</span>
                <button onClick={() => increment(item.id)}>+</button>
              </div>

              <p className="price">R$ {(item.price * item.qty).toFixed(2).replace(".", ",")}</p>
            </div>

            <button className="remove" onClick={() => removeItem(item.id)}>
              ✕
            </button>
          </div>
        ))}
      </div>

      <textarea className="obs" placeholder="Observações do pedido..." />

      {cart.length > 0 && (
        <>
          <button className="btn-clear" onClick={clearAll}>
            Limpar Carrinho
          </button>

          <button className="btn-send">
            Enviar para os Pedidos
          </button>
        </>
      )}
    </div>
  );
}
