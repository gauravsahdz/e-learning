import React from "react";
import { useNavigate } from "react-router-dom";

const TableBody = ({ users }) => {
  const navigateTo = useNavigate();
  const showDetail = (id) => {
    console.log(`/users/${id}`);
    navigateTo(`/users/${id}`);
  };
  return (
    <tbody>
      {users &&
        users.map((item, index) => {
          return (
            <tr key={index} onClick={() => showDetail(item.id)}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.address.city}</td>
              <td>{item.phone}</td>
              <td>{item.website}</td>
            </tr>
          );
        })}
    </tbody>
  );
};

export default TableBody;
