import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [filter]);

  return (
    <div className="p-4">
      <div className="font-bold text-lg mb-4">Users</div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div>
        {users.map((user) => (
          <UserCard key={user._id} user={user} navigate={navigate} />
        ))}
      </div>
    </div>
  );
};

const UserCard = ({ user, navigate }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-sm rounded-md mb-2">
      <div className="flex items-center">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mr-4">
          <div className="text-xl capitalize">{user.firstname[0]}</div>
        </div>
        <div>
          <div className="font-semibold">
            {user.firstname} {user.lastname}
          </div>
          {/* <div className="text-gray-500">{user.username}</div> */}
        </div>
      </div>
      <div>
        <Button
          onClick={() => {
            navigate(`/send?id=${user._id}&name=${user.firstname}`);
          }}
          label="Send Money"
        />
      </div>
    </div>
  );
};


export { Users };