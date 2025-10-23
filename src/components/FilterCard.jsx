import "./filtercard.css";
import PriceRangeSelector from "./PriceRangeSelector";

const FilterCard = ({ filters, handleFilter, categories }) => {
  function handleClearFilter() {
    handleFilter({
      name: "",
      category: "",
      minPrice: 0,
      maxPrice: 3000,
    });
  }
  return (
    <section className="filters_wrapper">
      <h2 className="filters_header">Filters</h2>
      <div className="filters_name">
        <label>Search by Name</label>
        <input
          id="product_name"
          type="text"
          value={filters?.name}
          onChange={(e) => handleFilter({ name: e.target.value })}
          placeholder="e.g., Eggs, Juice..."
        />
      </div>
      <div className="filters_category">
        <label>Category</label>
        <select
          id="product_category"
          value={filters?.category}
          onChange={(e) => handleFilter({ category: e.target.value })}
        >
          <option value="">All Categories</option>
          {categories?.map((category) => (
            <option value={category}>{category}</option>
          ))}
        </select>
      </div>
      <PriceRangeSelector filters={filters} handleFilter={handleFilter} />
      <button className="filters_clearBtn" onClick={handleClearFilter}>
        Clear All Filters
      </button>
    </section>
  );
};

export default FilterCard;
