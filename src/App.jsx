import { useEffect, useMemo, useState } from "react";
import FilterCard from "./components/FilterCard/FilterCard";
import ProductList from "./components/ProductList/ProductList";
import PostList from "./components/PostList/PostList";
import { useFetch } from "./hooks/use_fetch";

function App() {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const { data, error, loading, retry } = useFetch(
    "https://dummyjson.com/products"
  );

  const [filters, setFilter] = useState({
    name: params.get("name") || "",
    category: params.get("category") || "",
    minPrice: Number(params.get("minPrice")) || 0,
    maxPrice: Number(params.get("maxPrice")) || data?.maxPriceValue || 3000,
  });

  const categories = useMemo(() => {
    const allCategories = data?.products.map(
      (p) => p.category.charAt(0).toUpperCase() + p.category.slice(1)
    );

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
      !filters.category || product.category === filters.category.toLowerCase();
    const priceMatch =
      product.price >= filters.minPrice && product.price <= filters.maxPrice;

    return nameMatch && categoryMatch && priceMatch;
  });

  useEffect(() => {
    if (filters.name) {
      params.set("name", filters.name);
    } else {
      params.delete("name");
    }

    if (filters.category) {
      params.set("category", filters.category);
    } else {
      params.delete("category");
    }
    if (filters.minPrice !== 0) {
      params.set("minPrice", String(filters.minPrice));
    } else {
      params.delete("minPrice");
    }
    if (filters.maxPrice !== (data?.maxPriceValue || 3000)) {
      params.set("maxPrice", String(filters.maxPrice));
    } else {
      params.delete("maxPrice");
    }

    const queryString = params.toString();

    window.history.replaceState(
      {},
      "",
      window.location.pathname + (queryString ? "?" : "") + queryString
    );
  }, [filters, params, data]);

  useEffect(() => {
    if (!data?.maxPriceValue) return;

    setFilter((prev) => ({
      ...prev,
      maxPrice:
        prev.maxPrice > data.maxPriceValue ? data.maxPriceValue : prev.maxPrice,
    }));
  }, [data?.maxPriceValue]);

  return (
    <main>
      <FilterCard
        filters={filters}
        handleFilter={handleFilter}
        categories={categories}
        maxPriceValue={data?.maxPriceValue || 3000}
      />
      <hr
        style={{
          border: "none",
          borderTop: "2px solid rgb(224, 219, 219)",
        }}
      />
      {loading ? (
        <div className="loader">
          <p>Loading products...</p>
        </div>
      ) : error ? (
        <div className="error_card">
          <p className="error_text">Error while loading products.</p>
          <button className="error_btn" onClick={retry}>
            Retry
          </button>
        </div>
      ) : (
        <ProductList products={filteredProducts || []} />
      )}

      <hr
        style={{
          border: "none",
          borderTop: "2px solid rgb(224, 219, 219)",
        }}
      />
      <PostList />
    </main>
  );
}

export default App;
