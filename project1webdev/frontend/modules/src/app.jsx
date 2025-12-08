import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Boards from "./pages/boards.jsx";
import BoardPage from "./pages/boardspage.jsx";
import Payment from "./pages/payment.jsx";
import { AuthContext } from "./context/AuthContext.jsx";

// 🔐 Protected Route wrapper
function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/boards"
        element={
          <ProtectedRoute>
            <Boards />
          </ProtectedRoute>
        }
      />

      <Route
        path="/board/:id"
        element={
          <ProtectedRoute>
            <BoardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />

      {/* Default unknown route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

