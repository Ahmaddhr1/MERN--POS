import React, { useRef } from "react";
import Input from "../components/Input";
import axios from "axios";
import toast  from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate=useNavigate()
  const formRef = useRef(null);

  const handleCreate = async(e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const price = e.target.price.value;
    const quantity = e.target.quantity.value;
    try {
      const dataform = { name, price, quantity };
      const response = await axios.post(`${import.meta.env.VITE_URL}products`, dataform);
      toast.success(response.data);
      navigate('/products')
      formRef.current.reset();
    } catch (e) {
      console.error(e);
      toast.error("Failed to create product");
    }
  };

  return (
    <section className="section flex flex-col items-center w-full ">
      <h1 className="text-2xl font-bold mb-2">Create New Product</h1>
      <form
        ref={formRef}
        className="flex flex-col gap-3"
        onSubmit={handleCreate}
      >
        <div>
          <Input type={"text"} id="name" name="name" label="Name :" />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Input type={"number"} id="price" name="price" label="Price :" />
          <Input
            type={"number"}
            id="quantity"
            name="quantity"
            label="Quantity:"
            step="1"
          />
        </div>
        <button type="submit" className="btn-1">
          Create
        </button>
      </form>
    </section>
  );
};

export default CreateProduct;
