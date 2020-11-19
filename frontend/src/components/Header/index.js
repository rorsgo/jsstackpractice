import React from "react";
import { Link } from "react-router-dom";
import { MdShoppingBasket } from "react-icons/md";
import { useSelector } from "react-redux";

import logo from "../../assets/images/logo.svg";
import { Container, Cart } from "./styles";

export default function Header() {
  const cartSize = useSelector(state => state.cart.length);

  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="d1pshoes" />
      </Link>
      <Cart to="/cart">
        <div>
          <strong>Cart</strong>
          <span>{cartSize} items</span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Cart>
    </Container>
  )
}