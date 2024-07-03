import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "../../components/Header";

const UserDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    _id: "",
    username: "",
    phoneNumber: "",
    location: "",
    orders: [],
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
  }, []);

  const handleDelete =async() => {
    try {
      const response =await axios.delete(`${import.meta.env.VITE_URL}/users/${id}`);
      toast.success(response.data);
      navigate('/users')
    } catch (err) {
      toast.error("Error deleting user", err.message);
    }
  }

  return (
    <section className="section w-full">
      <div className="flex flex-col gap-4">
        <h1 className="headerSection">
          {user.username && user.username} Details
        </h1>
        <div>
          <h1 className="text-lg text-gray-800">Personal Info:</h1>
          <p>
            <span className="font-semibold">Phone Number:</span>
            {user.phoneNumber && user.phoneNumber}
          </p>
          <p>
            <span className="font-semibold">Location: </span>
            {user.location && user.location}
          </p>
          <div className="flex gap-3 mt-3">
            <Link to={`/users/${user._id}/edit`} className="btn-1">
              Edit
            </Link>
            <button
              onClick={handleDelete}
              to={`/users/${user._id}/edit`}
              className="btn-2"
            >
              Delete
            </button>
          </div>
        </div>
        <div>
          <h1 className="text-lg text-gray-800">Orders :</h1>
          <Header
            title={"Total Orders"}
            titleArr={0}
            btnText={"Make Order"}
            link={`/users/${id}/makeorder`}
          />
        </div>
      </div>
    </section>
  );
};

export default UserDetails;
