import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const navigate=useNavigate()
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/products/${id}`
      );
      setProduct(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response=await axios.delete(`${import.meta.env.VITE_URL}/products/${id}`);
      toast.success(response.data);
      navigate('/products')
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return (
    <div className="section flex flex-col gap-3 w-full">
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

    </div>
  );
};

export default ProductDetails;
