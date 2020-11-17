import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as CartActions from "../../store/modules/cart/actions";
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from "react-icons/md";
import { Container, ProductTable, Total } from "./styles";

function Cart({ cart, removeFromCart, updateAmount }) {
  function increment(product) {
    updateAmount(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmount(product.id, product.amount - 1);
  }
  
  return (
    <Container>
      <ProductTable>
        <thead>
          <th />
          <th>PRODUCT</th>
          <th>QTY</th>
          <th>SUBTOTAL</th>
          <th />
        </thead>
        <tbody>
          {cart.map(product => (
            <tr>
              <td>
                <img
                  src={product.image}
                  alt={product.title}
                />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.formattedPrice}</span>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    onClick={() => decrement(product)}
                  >
                    <MdRemoveCircleOutline size={20} color="#DDA000" />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button
                    type="button"
                    onClick={() => increment(product)}
                  >
                    <MdAddCircleOutline size={20} color="#DDA000" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.formattedPrice}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                >
                  <MdDelete size={20} color="#DDA000" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
      <footer>
        <button type="button">
          Proceed to checkout
        </button>
        <Total>
          <span>TOTAL</span>
          <strong>$ 10.90</strong>
        </Total>
      </footer>
    </Container>
  )
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => (
  bindActionCreators(CartActions, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);