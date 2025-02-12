import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import BarLoader from "react-spinners/BarLoader";
import Header from "../components/Header";

const Product = () => {
  const [products, setProduts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  
  const fetchProdcuts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_URL}/products`);
      setProduts(response.data);
      setFilteredProducts(response.data);
      setIsLoading(false);
    } catch (e) {
      toast.error("Error fetching products:", e.message);
      setIsLoading(false);
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
    <section className="section w-full">
      <Header
        title={"Products"}
        titleArr={filteredProducts.length}
        btnText={"Create Product"}
        link={"/products/new"}
      />
      <div>
        {isLoading ? (
          <div className="w-[300px] h-[100px] flex items-center justify-center">
            <BarLoader color="#007bff" width={100} />
          </div>
        ) : (
          <>
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
                  <Link to={`/products/${product._id}`}><span className="font-semibold">{index + 1}. {product.name} </span> - <span className="text-gray-700">{product.quantity} pieces</span></Link>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Product;
