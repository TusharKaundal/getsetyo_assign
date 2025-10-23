import React, { useRef } from "react";
import "./pricerange.css";
const PriceRangeSelector = ({ filters, handleFilter }) => {
  const priceRangeRef = useRef(0);

  function handleMinRange(value) {
    priceRangeRef.current.style.left = `${value / 30}%`;
    console.log(value);
    handleFilter({ minPrice: Number(value) });
  }

  function handleMaxRange(value) {
    priceRangeRef.current.style.right = `${100 - value / 30}%`;
    handleFilter({ maxPrice: Number(value) });
  }

  return (
    <div className="filters_range">
      <p>Price Range</p>
      <div className="priceInput">
        <div ref={priceRangeRef} className="priceinputTrack"></div>
        <input
          value={filters?.minPrice}
          min={0}
          max={1500}
          type="range"
          className="minselect"
          onChange={(e) => handleMinRange(e.target.value)}
        />
        <input
          value={filters?.maxPrice}
          min={1500}
          max={3000}
          type="range"
          className="maxselect"
          onChange={(e) => handleMaxRange(e.target.value)}
        />
      </div>
      <p className="minPrice">Min(₹{filters.minPrice})</p>
      <p className="maxPrice">Max(₹{filters.maxPrice})</p>
    </div>
  );
};

export default PriceRangeSelector;
