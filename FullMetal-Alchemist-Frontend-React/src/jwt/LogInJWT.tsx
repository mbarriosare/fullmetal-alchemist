
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProviderJWT";
import { useEffect } from "react";

const Login = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: "Supervisor" | "Alchemist") => {
    setToken("fake-jwt-token", role);
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const timer = setTimeout(() => handleLogin("Alchemist"), 3000);
    return () => clearTimeout(timer);
  }, []);

  return <div>Iniciaras Sesion Como Alquimista En Segundos...</div>;
};

export default Login;
