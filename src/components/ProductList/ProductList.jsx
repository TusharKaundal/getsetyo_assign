import ProductCard from "../ProductCard/ProductCard";
import "./productlist.css";

const ProductList = ({ products }) => {
  if (products.length === 0) {
    return <p>No Products Found</p>;
  }
  return (
    <>
      <h2>Results: {products.length}</h2>
      <div className="product_grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            category={product.category}
            price={product.price}
          />
        ))}
      </div>
    </>
  );
};

export default ProductList;
