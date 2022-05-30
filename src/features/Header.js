import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchFetch } from "./Search/searchSlice";
import { bagIcon } from "./Icons";
function Header() {
  const productItem = useSelector((state) => state.product.productItem);
  const amount = useSelector((state) => state.cart.amount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");

  const handleCall = useCallback(
    () => navigate("/search", { replace: true }),
    [navigate]
  );
  function searchClickHandle() {
    console.log("searchString", searchString);
    dispatch(
      searchFetch({ searchString: searchString, productItem: productItem })
    );
    handleCall();
  }

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand col-3">
          <Link className="navbar-brand noLink mainLogo" to="/home">
            FoodKart
          </Link>
        </div>

        <div className="col-4 flex-center">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control input-text"
              placeholder="Search products...."
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={(e) => setSearchString(e.target.value)}
            />
            <div className="input-group-append">
              <button
                onClick={searchClickHandle}
                className="btn btn-outline-warning btn-lg"
                type="button"
              >
                <i className="fa fa-search" />
              </button>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end col-3">
          <Link
            to="/cart"
            className="d-flex noLink"
            style={{ color: "#f8e9f2" }}
          >
            {bagIcon}
            <span className="bag-amount-span">{amount}</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
