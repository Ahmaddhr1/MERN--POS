import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";

const EditProducts = () => {
  const navigate = useNavigate();
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

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_URL}/products/${id}`,
        {
          name: product.name,
          price: product.price,
          quantity: product.quantity,
        }
      );
      toast.success(response.data);
      navigate(`/products/${id}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="section flex flex-col gap-3 w-full ">
      <div>
        <h1 className="headerSection">Edit {product.name}</h1>
        <form action="" className="flex flex-col gap-3 w-full">
          <Input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="input"
            label="Name :"
          />
          <div className="flex gap-3 w-full">
            <Input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              className="input"
              label="Price :"
            />
            <Input
              type="number"
              id="quantity"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              required
              className="input"
              label="Quantity:"
              step="1"
            />
          </div>
          <button
            type="submit"
            className="btn-1"
            onClick={handleSubmit}
            disabled={!product.name || !product.price || !product.quantity}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProducts;
