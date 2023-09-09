import { Route, Routes } from "react-router-dom"
import Albums from "./pages/Albums"
import Artists from "./pages/Artists"
import Home from "./pages/Home"
import Songs from "./pages/Songs"
import SongsFromOther from "./pages/SongsFromOther"
import Login from "./pages/Login"
import Register from "./pages/Register"

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login';
    return null;
  }
  
  const payload = JSON.parse(atob(token.split('.')[1]));
  if (payload.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    return null;
  }
  return children;
};

export default function App() {
  document.title = 'Music Library';
  return (
    <Routes>

      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="albums/:id/songs" element={<ProtectedRoute><SongsFromOther source='album' /></ProtectedRoute>} />
      <Route path="artists/:id/songs" element={<ProtectedRoute><SongsFromOther source='artist' /></ProtectedRoute>} />
      <Route path="albums" element={<ProtectedRoute><Albums /></ProtectedRoute>} />
      <Route path="artists" element={<ProtectedRoute><Artists /></ProtectedRoute>} />
      <Route path="songs" element={<ProtectedRoute><Songs /></ProtectedRoute>} />


    </Routes>
  )
}

