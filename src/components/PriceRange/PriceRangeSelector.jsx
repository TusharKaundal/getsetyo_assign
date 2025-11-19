import React, { useEffect, useRef } from "react";
import "./pricerange.css";

const PriceRangeSelector = ({ filters, handleFilter, maxPriceValue }) => {
  const priceRangeRef = useRef(null);

  useEffect(() => {
    const rangeWidth = maxPriceValue;

    const fillStart = (filters.minPrice / rangeWidth) * 100;
    const fillWidth =
      ((filters.maxPrice - filters.minPrice) / rangeWidth) * 100;

    if (priceRangeRef.current) {
      priceRangeRef.current.style.left = `${fillStart}%`;
      priceRangeRef.current.style.width = `${fillWidth}%`;
    }
  }, [filters.minPrice, filters.maxPrice, maxPriceValue]);

  function handleRange(key, value) {
    value = Number(value);

    if (key === "minPrice") {
      value = Math.min(value, filters.maxPrice - 5);
    } else {
      value = Math.max(value, filters.minPrice + 5);
    }

    handleFilter({ [key]: value });
  }

  return (
    <div className="filters_range">
      <p>Price Range</p>
      <div className="filters_range_container">
        <input
          id="minRange"
          type="range"
          className="filters_range_input"
          min="0"
          max={maxPriceValue}
          value={filters.minPrice}
          onChange={(event) => handleRange("minPrice", event.target.value)}
        />
        <input
          type="range"
          id="maxRange"
          className="filters_range_input"
          min="0"
          max={maxPriceValue}
          value={filters.maxPrice}
          onChange={(event) => handleRange("maxPrice", event.target.value)}
        />
        <div className="filters_range_track"></div>
        <div ref={priceRangeRef} className="filter_range_fill"></div>
      </div>
      <div className="price_Range">
        <span>₹{filters.minPrice}</span>
        <span>₹{filters.maxPrice}</span>
      </div>
    </div>
  );
};

export default PriceRangeSelector;
