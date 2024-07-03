import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/Input";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    _id: "",
    username: "",
    phoneNumber: "",
    location: "",
  });
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}users/${id}`
      );
      setUser(response.data);
    } catch (err) {
      toast.error("error fetching user data", err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user.username) return toast.error("Username is required");
    if (!user.phoneNumber) return toast.error("Phone Number is required");
    if (!user.location) {
      toast.error("Location is required ");
    }

    try {
      setIsLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_URL}/users/${id}`,
        {
          username: user.username,
          phoneNumber: user.phoneNumber,
          location: user.location,
        }
      );
      toast.success(response.data);
      setIsLoading(false);
      navigate(`/users/${id}`);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <section className="section w-full">
      <h1 className="headerSection mb-3">Edit {user.username} Info</h1>

      <form className="flex flex-col gap-2">
        <Input
          type="text"
          id="username"
          name="username"
          value={user.username}
          onChange={handleChange}
          required
          label="Name :"
        />
        <Input
          type="number"
          id="phoneNumber"
          name="phoneNumber"
          value={user.phoneNumber}
          onChange={handleChange}
          required
          label="Phone Number :"
          step="1"
        />
        <Input
          type="text"
          id="location"
          name="location"
          value={user.location}
          onChange={handleChange}
          required
          label="Location :"
        />
        <button type="submit" className="btn-1" onClick={handleUpdate}>
          Update
        </button>
      </form>
    </section>
  );
};

export default EditUser;
