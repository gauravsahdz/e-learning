import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useState } from "react";
import { getToken } from "./store/actions/usersAction";
import Nav from "./components/Nav";
import CourseList from "./components/CourseList";
import CourseDetail from "./components/CourseDetail";
import HomePage from "./components/Home";
import StudentDashboard from "./components/Dashboard";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(Boolean);
  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      if (token) {
        setAuthenticated(true);
      }
    };

    fetchToken();
  }, []);
  return (
    <BrowserRouter>
      <Nav token={isAuthenticated} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CourseList />} />

        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              token={isAuthenticated}
              children={<StudentDashboard />}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
