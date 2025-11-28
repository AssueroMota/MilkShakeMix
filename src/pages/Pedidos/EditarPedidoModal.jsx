import React, { useState, useMemo } from "react";
import "./EditarPedidoModal.scss";
import burgerImg from "../../assets/img/produtos/burger.png";
import batataImg from "../../assets/img/produtos/batata.png";
import bebidaImg from "../../assets/img/produtos/bebidas.png";
import milkImg from "../../assets/img/produtos/milk.png";
import acaiImg from "../../assets/img/produtos/acai.png";
import pizzaImg from "../../assets/img/produtos/pizza.png";
import sorveteImg from "../../assets/img/produtos/sorvete.png";

export default function EditarPedidoModal({ pedido, onClose, onSave }) {
  const [search, setSearch] = useState("");
  const [itens, setItens] = useState(pedido.itens);

const TODOS_PRODUTOS = [
  {
    name: "Hambúrguer Artesanal",
    categoria: "Hambúrgueres",
    price: 24.9,
    image: burgerImg
  },
  {
    name: "Batata Frita Grande",
    categoria: "Porções",
    price: 14.9,
    image: batataImg
  },
  {
    name: "Refrigerante Lata",
    categoria: "Bebidas",
    price: 7.5,
    image: bebidaImg
  },
  {
    name: "Milk-shake Morango",
    categoria: "Milk-shakes",
    price: 18.9,
    image: milkImg
  },
  {
    name: "Açaí na Tigela",
    categoria: "Açaí",
    price: 16.9,
    image: acaiImg
  },
  {
    name: "Pizza Margherita",
    categoria: "Pizzas",
    price: 32.9,
    image: pizzaImg
  },
  {
    name: "Sorvete Baunilha",
    categoria: "Sorvetes",
    price: 12.9,
    image: sorveteImg
  }
];


  const selecionado = (name) => itens.some((i) => i.name === name);

  const toggleItem = (prod) => {
    if (selecionado(prod.name)) {
      setItens((prev) => prev.filter((i) => i.name !== prod.name));
    } else {
      setItens((prev) => [...prev, { name: prod.name, qty: 1 }]);
    }
  };

  const editarQtd = (name, delta) => {
    setItens((prev) =>
      prev.map((i) =>
        i.name === name ? { ...i, qty: Math.max(1, i.qty + delta) } : i
      )
    );
  };

  const filtrados = useMemo(() => {
    return TODOS_PRODUTOS.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const salvar = () => {
    const total = itens.reduce((acc, i) => {
      const prod = TODOS_PRODUTOS.find((p) => p.name === i.name);
      return acc + (prod?.price || 0) * i.qty;
    }, 0);
    onSave({ ...pedido, itens, total });
  };

  return (
    <div className="editar-overlay">
      <div className="editar-modal">

        <button className="close-btn" onClick={onClose}>✕</button>

        <h2>Editar Pedido #{pedido.id}</h2>

        <p className="sub">Selecione ou modifique os itens deste pedido.</p>

        {/* Top row */}
        <div className="edit-top">
          <input
            type="text"
            className="search"
            placeholder="Buscar produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="contador">
            {itens.length} selecionado{itens.length !== 1 && "s"}
          </div>
        </div>

        {/* Lista grande */}
        <div className="lista-produtos">
          {filtrados.map((prod, idx) => (
            <div
              className={`produto-row ${selecionado(prod.name) ? "ativo" : ""}`}
              key={idx}
            >

              {/* Checkbox */}
              <input
                type="checkbox"
                checked={selecionado(prod.name)}
                onChange={() => toggleItem(prod)}
              />

              {/* Imagem */}
              <div className="thumb">
                <img src={prod.image} alt={prod.name} />
              </div>

              {/* Nome + categoria */}
              <div className="info">
                <strong>{prod.name}</strong>
                <span>{prod.categoria}</span>
              </div>

              {/* Preço */}
              <div className="preco">
                R$ {prod.price.toFixed(2).replace(".", ",")}
              </div>

              {/* Quantidade se marcado */}
              {selecionado(prod.name) && (
                <div className="qty">
                  <button onClick={() => editarQtd(prod.name, -1)}>-</button>
                  <span>{itens.find((i) => i.name === prod.name)?.qty || 1}</span>
                  <button onClick={() => editarQtd(prod.name, +1)}>+</button>
                </div>
              )}

            </div>
          ))}
        </div>

        <div className="footer">
          <button className="btn salvar" onClick={salvar}>Salvar alterações</button>
        </div>

      </div>
    </div>
  );
}
