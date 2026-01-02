import { useState } from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export default function ProtectedLayout() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoading(false);
        return;
      }

      setIsAuthenticated(true);
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Memeriksa autentikasi...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    setTimeout(() => {
      navigate("/login");
    }, 2000);

    return (
      <div className="flex items-center justify-center h-screen text-center p-4">
        Kamu tidak memiliki akses ke halaman ini. Mengalihkan ke halaman
        login...
      </div>
    );
  }

  return <Outlet />;
}
