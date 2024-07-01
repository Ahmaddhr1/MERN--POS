import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Product = () => {
  const [products, setProduts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const fetchProdcuts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/products`);
      setProduts(response.data);
      setFilteredProducts(response.data);
    } catch (e) {
      console.error("Error fetching products:", e.message);
    }
  };

  useEffect(() => {
    fetchProdcuts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);
  return (
    <section className="section">
      <div className="flex items-center justify-between bg-gray-100 padding rounded-md mb-3">
        <h1 className="">Products:{filteredProducts.length}</h1>
        <Link to={"/products/new"} className="btn-1">
          Create Product
        </Link>
      </div>
      <div>
      <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1 mb-3"
        />
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((product, index) => (
            <div key={index} className="flex items-center gap-3 mb-2">
              <Link to={`/products/${product._id}`}>{product.name}</Link>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Product;
