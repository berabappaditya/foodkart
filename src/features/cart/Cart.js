import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "./cartSlice";
import { deleteIcon } from "../Icons";

function Cart() {
  const dispatch = useDispatch();
  const { cartItem, amount, total } = useSelector((state) => state.cart);

  if (cartItem.length === 0) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Cart is empty</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart pt-5">
      <section className="row d-flex justify-content-center">
        <div className="col-8 row">
          <h2 className=" mb-3">Your Cart</h2>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col"></th>
                <th scope="col" className="text-center">
                  Quantity
                </th>
                <th scope="col">Price</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {cartItem.map((item) => {
                return (
                  <tr key={item.id}>
                    <th scope="row">
                      <img src={item.filename} alt="..." />
                    </th>
                    <td>{item.title}</td>
                    <td className="text-center">
                      <div>
                        <button
                          type="button"
                          className="btn btn-outline-primary border border-white"
                          onClick={() => {
                            dispatch(increaseQuantity(item));
                          }}
                        >
                          <b style={{ fontSize: "1.4rem" }}>+</b>
                        </button>
                        <span className="p-2  ms-1 me-1 mt-2 ">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="btn btn-outline-secondary border border-white"
                          onClick={() => {
                            if (item.quantity === 1) {
                              dispatch(removeFromCart(item.id));
                              return;
                            }
                            dispatch(decreaseQuantity(item));
                          }}
                        >
                          <b style={{ fontSize: "1.4rem" }}> -</b>
                        </button>
                      </div>
                    </td>
                    <td>${item.price}</td>
                    <td className="text-center">
                      {" "}
                      <button
                        style={{ height: "5vh", width: "4vw" }}
                        className="btn btn-outline-danger"
                        onClick={() => {
                          dispatch(removeFromCart(item.id));
                        }}
                      >
                        {deleteIcon}
                      </button>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <th scope="row">Total</th>
                <td></td>
                <td className="text-center">{amount}</td>
                <td></td>
                <td className="text-center">${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Cart;
