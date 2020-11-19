import React, { useState, useEffect } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import api from "../../services/api";
import { formatPrice } from "../../util/format";
import * as CartActions from "../../store/modules/cart/actions";

import { ProductList } from "./styles";

export default function Home() {
  const [products, setProduct] = useState([]);

  const amount = useSelector(state => state.cart.reduce(
    (amountSum, product) => {
      amountSum[product.id] = product.amount

      return amountSum
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get("products");

      const data = response.data.map(product => ({
        ...product,
        formattedPrice: formatPrice(product.price)
      }));

      setProduct(data);
    }
    loadProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img
            src={product.image}
            alt={product.title}
          />
          <strong>{product.title}</strong>
          <span>{product.formattedPrice}</span>
          <button
            type="button"
            onClick={() => handleAddProduct(product.id)}
          >
            <div>
              <MdAddShoppingCart size={16} color="#FFF" /> {amount[product.id] || 0}
            </div>
            <span>Add to cart</span>
          </button>
        </li>
      ))}
    </ProductList>
  )
}