import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { addToCart } from "../cart/cartSlice";

function ProductList() {
  const productItem = useSelector((state) => state.product.productItem);
  const cartItems = useSelector((state) => state.cart.cartItem);
  const [productState, setTypeState] = useState(productItem);
  const [currentType, setCurrentType] = useState("allType");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const typeArray = [];
  productItem.map((item) => {
    if (!typeArray.includes(item.type)) {
      typeArray.push(item.type);
    }
  });

  const cartItemIDArr = [];
  cartItems.map((item) => {
    if (!cartItemIDArr.includes(item.id)) {
      cartItemIDArr.push(item.id);
    }
  });

  function typeFilter(type) {
    setCurrentType(type);
    if (type === "allType") {
      setTypeState(productItem);
    } else {
      setTypeState(productItem.filter((item) => item.type === type));
    }
  }

  const handleOnGotoCart = useCallback(
    () => navigate("/cart", { replace: true }),
    [navigate]
  );

  return (
    <div className="product-list row">
      <div className="product-type col-1">
        <ul>
          {typeArray.map((item) => {
            return item === currentType ? (
              <li
                type="button"
                className="type-list"
                style={{ backgroundColor: "#ff0022", color: "#f8e9f2" }}
                key={item}
              >
                {item}
              </li>
            ) : (
              <li
                type="button"
                className="type-list"
                key={item}
                style={{}}
                onClick={() => {
                  typeFilter(item);
                }}
              >
                {item}
              </li>
            );
          })}
          <li
            type="button"
            className="type-list"
            style={
              currentType === "allType"
                ? { backgroundColor: "#ff0022", color: "#f8e9f2" }
                : {}
            }
            onClick={() => {
              typeFilter("allType");
            }}
          >
            All Items
          </li>
        </ul>
      </div>
      <div className="product-list-item col-11 row">
        {productState.map((item) => {
          return (
            <div
              className="col-sm-3"
              key={item.id}
              style={{ marginBottom: "5vh" }}
            >
              <div className="card">
                <img
                  src={item.filename}
                  alt="..."
                  style={{ width: "100%", height: "40vh" }}
                ></img>
                <div className="card-header">
                  <b>{item.title}</b>
                </div>
                <div className="card-body">
                  <div
                    className="card-description"
                    style={{ width: "100%", height: "12vh" }}
                  >
                    <p style={{ fontSize: "1vw" }}>{item.description}</p>
                  </div>

                  <div
                    className="d-flex justify-content-between"
                    style={{ marginBottom: "1vh" }}
                  >
                    <div>
                      <b>Price: ${item.price}</b>{" "}
                    </div>
                    <div>
                      {[1, 2, 3, 4, 5].map((rate, index) => {
                        return rate <= item.rating ? (
                          <span
                            key={index}
                            className="fa fa-star checked"
                            style={{
                              height: "20px",
                              width: "20px",
                              color: "#FFD700",
                            }}
                          ></span>
                        ) : (
                          <span
                            key={index}
                            className="fa fa-star"
                            style={{ height: "20px", width: "20px" }}
                          ></span>
                        );
                      })}
                    </div>
                  </div>

                  {cartItemIDArr.includes(item.id) ? (
                    <button className="product-btn" onClick={handleOnGotoCart}>
                      Go to Cart
                    </button>
                  ) : (
                    <button
                      className="product-btn-addToCart"
                      onClick={() => {
                        dispatch(addToCart(item));
                      }}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductList;
