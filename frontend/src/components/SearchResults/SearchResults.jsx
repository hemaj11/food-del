import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./SearchResults.css";

const SearchResults = () => {
  const { food_list, cartItems, addToCart, removeFromCart, loadCartData, token } = useContext(StoreContext);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const location = useLocation();

  // Refresh cart details when navigating to this page
  useEffect(() => {
    if (token && typeof loadCartData === "function") {
      loadCartData(token);
    }
  }, [location.pathname, token, loadCartData]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("query")?.toLowerCase() || "";
    setQuery(q);
    if (q && food_list && food_list.length > 0) {
      const filtered = food_list.filter((item) =>
        item.name.toLowerCase().includes(q)
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [location.search, food_list]);

  return (
    <div className="search-results-container">
      <h2>Search Results</h2>
      {query === "" ? (
        <div className="search-default-message">
          <p>Start typing to search for food!</p>
        </div>
      ) : results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="search-results-list">
          {results.map((item) => (
            <div className="search-result-card" key={item._id}>
              <div className="search-result-img-box">
                <img
                  src={
                    item.image.startsWith("http")
                      ? item.image
                      : `http://localhost:4000/images/${item.image}`
                  }
                  alt={item.name}
                  className="search-result-img"
                />
              </div>
              <div className="search-result-details">
                <div className="search-result-title">{item.name}</div>
                <div className="search-result-desc">{item.description}</div>
                <div className="search-result-bottom">
                  <div className="search-result-price">₹{item.price}</div>
                  <div className="search-result-cart-btns">
                    {cartItems[item._id] > 0 ? (
                      <>
                        <button onClick={() => removeFromCart(item._id)}>-</button>
                        <span>{cartItems[item._id]}</span>
                        <button onClick={() => addToCart(item._id)}>+</button>
                      </>
                    ) : (
                      <button onClick={() => addToCart(item._id)}>+</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;