import React from "react";
import "./CartButton.scss";

export default function CartButton({ count, onClick }) {
  if (count === 0) return null;

  return (
    <button className="cart-button" onClick={onClick}>
      🧺
      <span className="cart-badge">{count}</span>
    </button>
  );
}
