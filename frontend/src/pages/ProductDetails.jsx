import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BarLoader from "react-spinners/BarLoader";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/products/${id}`
      );
      setProduct(response.data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
      
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_URL}/products/${id}`
      );
      toast.success(response.data);
      navigate("/products");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return (
    <div className="section flex flex-col gap-3 w-full">
      {isLoading ? (
        <div className="w-[300px] h-[100px] flex items-center justify-center">
          <BarLoader color="#007bff" width={100} />
        </div>
      ) : (
        <>
          <div>
            <h2 className="headerSection">{product.name} Details</h2>
            <p>Price: {product.price} $</p>
            <p>Quantity: {product.quantity}</p>
          </div>
          <div className="flex gap-2">
            <Link to={`/products/${id}/edit`} className="btn-1">
              Edit
            </Link>
            <button onClick={handleDelete} className="btn-2">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
