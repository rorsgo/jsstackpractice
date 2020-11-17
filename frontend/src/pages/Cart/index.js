import React from "react";
import { connect } from "react-redux";
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from "react-icons/md";
import { Container, ProductTable, Total } from "./styles";

function Cart({ cart, dispatch }) {
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
                    onClick={() => { }}
                  >
                    <MdRemoveCircleOutline size={20} color="#DDA000" />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button
                    type="button"
                    onClick={() => { }}
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
                  onClick={() => dispatch({
                    type: "REMOVE_FROM_CART",
                    id: product.id
                  })}
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

export default connect(mapStateToProps)(Cart);