import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Registered successfully!");
      navigate("/");
    } catch (e) {
      alert("Error registering user");
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-left">
        <h1>Create Your Account</h1>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2>REGISTER</h2>

          <form onSubmit={registerUser}>
            <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Register</button>

            <p style={{ marginTop: "10px" }}>
              Already have an account?{" "}
              <Link to="/">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

