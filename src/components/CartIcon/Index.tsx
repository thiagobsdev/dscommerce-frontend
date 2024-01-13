import "./styles.css";

import cartIcon from "../../assets/cart.svg";
import { useContext } from "react";
import { ContextCartCount } from "../../utils/context-cart";

export default function CartIcon() {

const {contextCartCount} = useContext(ContextCartCount);

  return (
    <div className="dsc-cart-count-container">
      <img src={cartIcon} alt="Carrinho de compras" />
      <div className="dsc-cart-count">{contextCartCount}</div>
    </div>
  );
}
