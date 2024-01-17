import React, { useState, useEffect } from "react";
import { getUsers } from "../actions/apiService";
import "../styles/table.css";
import TableBody from "./TableBody";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const navigateTo = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        if (data) {
          setUsers(data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const logOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigateTo("/login");
  };

  return (
    <div>
      <button
        onClick={(e) => {
          logOut(e);
        }}
      >
        Log Out
      </button>
      <table className="custom-table">
        <thead>
          <tr>
            <th>S.N</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Website</th>
          </tr>
        </thead>
        <TableBody users={users} />
      </table>
    </div>
  );
};

export default Table;
