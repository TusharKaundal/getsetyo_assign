import { useMemo, useState } from "react";
import FilterCard from "./components/FilterCard";
import ProductList from "./components/productList";
import { useFetch } from "./hooks/use_fetch";

function App() {
  const { data, error, loading, retry } = useFetch(
    "https://dummyjson.com/products"
  );

  const [filters, setFilter] = useState({
    name: "",
    category: "",
    minPrice: 0,
    maxPrice: 3000,
  });

  const categories = useMemo(() => {
    const allCategories = data?.products.map((p) => p.category);

    return [...new Set(allCategories)];
  }, [data]);

  function handleFilter(data) {
    console.log(data);
    setFilter((prev) => ({ ...prev, ...data }));
  }

  const filteredProducts = data?.products.filter((product) => {
    const nameMatch = product?.title
      .toLowerCase()
      .includes(filters?.name.toLowerCase());
    const categoryMatch =
      !filters.category || product.category === filters.category;
    const priceMatch =
      product.price >= filters.minPrice && product.price <= filters.maxPrice;

    return nameMatch && categoryMatch && priceMatch;
  });

  return (
    <main>
      <FilterCard
        filters={filters}
        handleFilter={handleFilter}
        categories={categories}
      />
      <hr
        style={{
          marginBlock: "1.5rem",
          border: "none",
          borderTop: "2px solid rgb(224, 219, 219)",
        }}
      />
      {loading && (
        <div className="loader">
          <p>Loading products...</p>
        </div>
      )}

      {error ? (
        <div className="error_card">
          <p className="error_text">Error while loading products.</p>
          <button className="error_btn" onClick={retry}>
            Retry 🔁
          </button>
        </div>
      ) : (
        <ProductList products={filteredProducts || []} />
      )}
    </main>
  );
}

export default App;
