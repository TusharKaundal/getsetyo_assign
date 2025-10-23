import React from "react";
import "./productcard.css";
function truncate(str, maxLength = 10) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}

const ProductCard = ({ title, category, price }) => {
  return (
    <div className="card" title={title}>
      <h3 className="card-title">{truncate(title)}</h3>
      <p className="card-category">{category}</p>
      <hr className="divider" />
      <div className="card-footer">
        <span className="price">₹{price}</span>
        <button className="buy-btn">Buy Now</button>
      </div>
    </div>
  );
};

export default ProductCard;
