import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Boards() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState("");

  const loadBoards = async () => {
    const res = await axios.get("http://localhost:3000/api/boards", {
      headers: { Authorization: token },
    });
    setBoards(res.data);
  };

  const createBoard = async () => {
    if (!title.trim()) return;

    await axios.post(
      "http://localhost:3000/api/boards",
      { title },
      { headers: { Authorization: token } }
    );

    setTitle("");
    loadBoards();
  };

  useEffect(() => {
    loadBoards();
  }, []);

  return (
    <>
      <div className="topbar">
        <h2>Your Boards</h2>

        <div className="topbar-right">
          <Link className="btn-secondary" to="/payment">Buy Premium</Link>
          <button className="btn-danger" onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="boards-page">
        <div className="board-form">
          <input
            placeholder="New Board Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={createBoard}>Create</button>
        </div>

        <div className="board-grid">
          {boards.map((b) => (
            <div
              key={b._id}
              className="board-card"
              onClick={() => navigate(`/board/${b._id}`)}
            >
              {b.title}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
