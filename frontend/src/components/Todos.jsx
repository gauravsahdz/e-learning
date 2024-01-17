import React, { useState, useEffect } from "react";
import { getTodos } from "../actions/apiService";
import { useParams } from "react-router-dom";

const Todos = () => {
  const { id } = useParams();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log("getting id", id);
    const fetchData = async () => {
      try {
        const data = await getTodos(id);
        console.log("todos data", data);
        if (data) {
          setTodos(data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th>S.N</th>
          <th>Title</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {todos &&
          todos.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.completed ? "Yes" : "No"}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Todos;
