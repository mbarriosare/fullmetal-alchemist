
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProviderJWT";
import { useEffect } from "react";

const Logout = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setToken(null);
      navigate("/", { replace: true });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return <div>Cerrando La Sesion...</div>;
};

export default Logout;
