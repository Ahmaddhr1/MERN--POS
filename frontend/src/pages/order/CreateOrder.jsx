import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BarLoader from "react-spinners/BarLoader";

const CreateOrder = () => {
  const [products, setProducts] = useState([]);
  const [formSections, setFormSections] = useState([
    { product: "", price: "", quantity: "" },
  ]);
  const [totalCost, setTotalCost] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}products`);
      setProducts(response.data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let sum = 0;
    formSections.forEach((section) => {
      if (section.price && section.quantity) {
        const price = parseFloat(section.price);
        const quantity = parseFloat(section.quantity);
        sum += price * quantity;
      }
    });
    setTotalCost(sum);
  }, [formSections]);

  const handleProductChange = (index, e) => {
    const productName = e.target.value;
    const product = products.find((p) => p.name === productName);
    const newFormSections = [...formSections];
    newFormSections[index] = {
      product: productName,
      price: product ? product.price : "",
      quantity: newFormSections[index].quantity,
    };
    setFormSections(newFormSections);
  };

  const handlePriceChange = (index, e) => {
    const newFormSections = [...formSections];
    newFormSections[index].price = e.target.value;
    setFormSections(newFormSections);
  };

  const handleQuantityChange = (index, e) => {
    const newFormSections = [...formSections];
    newFormSections[index].quantity = e.target.value;
    setFormSections(newFormSections);
  };

  const addFormSection = () => {
    setFormSections([
      ...formSections,
      { product: "", price: "", quantity: "" },
    ]);
  };

  const handleSubmit = () => {
    if (
      formSections.some(
        (section) => !section.product || !section.price || !section.quantity
      )
    ) {
      toast.error("All fields are required");
      return;
    }
  };

  return (
    <section className="section w-full">
      <div className="w-fit mx-auto">
        <h1 className="headerSection text-2xl mb-4">Create Order</h1>
        {loading && (
          <BarLoader
            color="#4A90E2"
            height={4}
            css={{ width: "100%", margin: "10px 0" }}
          />
        )}
        <form className="flex flex-col gap-3">
          {formSections.map((section, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center md:gap-4"
            >
              <input
                type="text"
                name={`product-${index}`}
                placeholder="Select Product"
                list={`products-list-${index}`}
                value={section.product}
                onChange={(e) => handleProductChange(index, e)}
                className="border border-black outline-blue-500 px-3 py-2 w-full md:w-auto"
              />
              <datalist id={`products-list-${index}`}>
                {products.map((product) => (
                  <option key={product.id} value={product.name} />
                ))}
              </datalist>
              <input
                type="number"
                name={`price-${index}`}
                placeholder="Price"
                value={section.price}
                onChange={(e) => handlePriceChange(index, e)}
                className="border border-black outline-blue-500 px-3 py-2 w-full md:w-auto"
              />
              <input
                type="number"
                step={1}
                name={`quantity-${index}`}
                placeholder="Quantity"
                value={section.quantity}
                onChange={(e) => handleQuantityChange(index, e)}
                className="border border-black outline-blue-500 px-3 py-2 w-full md:w-auto"
              />
              {section.price && section.quantity && (
                <span className="text-sm md:text-base">
                  Total Cost:{" "}
                  {(
                    parseFloat(section.price) * parseFloat(section.quantity)
                  ).toFixed(2)}
                </span>
              )}
            </div>
          ))}
          <button type="button" onClick={addFormSection} className="btn-1">
            Add Product
          </button>
          <div className="mt-4 flex justify-between items-center">
            <h2 className="text-xl">
              Total Order Cost: {totalCost.toFixed(2)}
            </h2>
            <button
              type="submit"
              className="btn-3"
              disabled={formSections.some((section) => !section.product)}
              onClick={handleSubmit}
            >
              Submit Order
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateOrder;
