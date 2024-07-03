import React, { useRef, useState } from "react";
import Input from "../../components/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";

const CreateUser = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleCreate = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const phoneNumber = e.target.phoneNumber.value;
    const location = e.target.location.value;
    try {
      setIsLoading(true);
      const dataform = { username, phoneNumber, location };
      const response = await axios.post(
        `${import.meta.env.VITE_URL}users`,
        dataform
      );
      toast.success(response.data);
      navigate("/users");
      formRef.current.reset();
      setIsLoading(false);
    } catch (e) {
      toast.error("Failed to create user",e.message);
      setIsLoading(false);
    }
  };

  return (
    <section className="section flex flex-col items-center w-full ">
      <h1 className="text-2xl font-bold mb-2">Create New User</h1>
      <form
        ref={formRef}
        className="flex flex-col gap-3"
        onSubmit={handleCreate}
      >
        <div>
          <Input
            type={"text"}
            id="username"
            name="username"
            label="Username :"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Input
            type={"number"}
            step="1"
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number :"
          />
          <Input
            type={"text"}
            id="location"
            name="location"
            label="Location:"
          />
        </div>
        <button type="submit" className="btn-1">
          {isLoading ? (
            <BarLoader color="#ffffff" width={50} height={5} />
          ) : (
            "Create"
          )}
        </button>
      </form>
    </section>
  );
};

export default CreateUser;
