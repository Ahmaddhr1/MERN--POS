import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import BarLoader from "react-spinners/BarLoader";

const User = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_URL}/users`);
      setUsers(response.data);
      setFilteredUsers(response.data);
      setIsLoading(false);
    } catch (e) {
      toast.error(`Error fetching users: ${e.message}`);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.username
        ? user.username.toLowerCase().includes(searchQuery.toLowerCase().trim())
        : false
    );
    setFilteredUsers(filtered);
  }, [searchQuery]);

  console.log(filteredUsers);
  return (
    <section className="section w-full">
      <Header
        title={"Users"}
        titleArr={filteredUsers.length}
        btnText={"Create User"}
        link={"/users/new"}
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
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 mb-3"
            />
            {filteredUsers.length === 0 ? (
              <p>No users found.</p>
            ) : (
              filteredUsers.map((user, index) => (
                <div key={index} className="flex items-center gap-3 mb-2">
                  <Link to={`/users/${user._id}`}>
                    <span className="font-semibold">
                      {index + 1}. {user.username}
                    </span>{" "}
                    - <span className="text-gray-700">{user.location}</span>
                  </Link>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default User;
