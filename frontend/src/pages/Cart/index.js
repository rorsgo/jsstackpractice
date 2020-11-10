import React from "react";

import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from "react-icons/md";
import { Container, ProductTable, Total } from "./styles";

export default function Cart() {
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
          <tr>
            <td>
              <img
                src="https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_1200,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.shopify.com/s/files/1/0204/0483/0283/products/Allbirds_WL_RN_SF_PDP_Natural_Black_BTY_fc7cfd13-f8fb-4723-a478-a2fea603c9fe.png?v=1600891285"
                alt="Nice Sneaker"
              />
            </td>
            <td>
              <strong>Nice Sneaker</strong>
              <span>$ 10.90</span>
            </td>
            <td>
              <div>
                <button type="button">
                  <MdRemoveCircleOutline size={20} color="#DDA000" />
                </button>
                <input type="number" readOnly value={1} />
                <button type="button">
                  <MdAddCircleOutline size={20} color="#DDA000" />
                </button>
              </div>
            </td>
            <td>
              <strong>$ 10.90</strong>
            </td>
            <td>
              <button type="button">
                <MdDelete size={20} color="#DDA000" />
              </button>
            </td>
          </tr>
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