
import { useAuth } from "./AuthProviderJWT";
import { NavLink } from "react-router-dom";

const UserHomePage = () => {
  const { role } = useAuth();

  return (
    <div>
      <h1>Panel De Usuario </h1>
      <p>Rol Especifico: {role}</p>
      <nav>
        <NavLink to="/profile">Mi Perfil</NavLink> |{" "}
        <NavLink to="/logout">Cerrar Sesión</NavLink>
      </nav>
      {role === "Supervisor" && <div>Funciones Del Supervisor</div>}
      {role === "Alchemist" && <div>Funciones Del Alquimista</div>}
    </div>
  );
};

export default UserHomePage;
