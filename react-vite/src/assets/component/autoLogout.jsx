import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../utils/auth";

function AutoLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    let wasLoggedIn = !!getCurrentUser();

    const check = () => {
      const user = getCurrentUser(); // otomatis hapus session kalau sudah kedaluwarsa
      if (wasLoggedIn && !user) {
        logout();
        navigate("/login", { replace: true });
      }
      wasLoggedIn = !!user;
    };

    const interval = setInterval(check, 1000);
    window.addEventListener("focus", check);
    document.addEventListener("visibilitychange", check);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", check);
      document.removeEventListener("visibilitychange", check);
    };
  }, [navigate]);

  return null;
}

export default AutoLogout;
