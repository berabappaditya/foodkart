import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../cart/cartSlice";
import { previous } from "../Icons";

function Search() {
  const { searchResult, isLoading } = useSelector((state) => state.search);
  const cartItems = useSelector((state) => state.cart.cartItem);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItemIDArr = [];
  cartItems.map((item) => {
    if (!cartItemIDArr.includes(item.id)) {
      cartItemIDArr.push(item.id);
    }
    return "";
  });
  const handleOnGotoCart = useCallback(
    () => navigate("/cart", { replace: true }),
    [navigate]
  );
  const goHome = useCallback(
    () => navigate("/home", { replace: true }),
    [navigate]
  );

  if (isLoading) {
    return (
      <div style={{ margin: "0 2vh" }}>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div style={{ margin: "0 2vh" }}>
      <p
        type="button"
        onClick={goHome}
        style={{ color: "gray", fontSize: "20px" }}
      >
        {previous}back
      </p>
      {searchResult.length === 0 ? (
        <h1 className="mt-5 ms-5">No Result Found</h1>
      ) : (
        <div className="mt-5 ms-5">
          <h3>Search Results</h3>
          <div className="product-list-item col-11 ms-3 mt-5 row">
            {searchResult.map((item) => {
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
                                className="fa fa-star"
                                style={{ height: "20px", width: "20px" }}
                              ></span>
                            );
                          })}
                        </div>
                      </div>

                      {cartItemIDArr.includes(item.id) ? (
                        <button
                          className="product-btn"
                          onClick={handleOnGotoCart}
                        >
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
      )}
    </div>
  );
}

export default Search;
