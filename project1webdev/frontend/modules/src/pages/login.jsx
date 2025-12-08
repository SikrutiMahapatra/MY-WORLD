import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style.css";

export default function Login() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      setToken(res.data.token);
      navigate("/boards");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-left">
        <h1>Welcome To Trello</h1>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2>LOGIN</h2>

          <form onSubmit={loginUser}>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>

            <p style={{ marginTop: "10px" }}>
              Don't have an account?{" "}
              <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
