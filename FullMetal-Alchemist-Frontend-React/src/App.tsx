
import { Routes, Route, NavLink } from "react-router-dom";
import { InformationComponent } from "./components/InformationComponent";
import { DashBoardComponent } from "./components/DashBoardComponent";
import { AuditoryDashboard } from "./components/AuditoryHistoryDashBoardComponent";
import { AlchemistFunctions } from "./components/AlchemistFunctionsComponent";
import { SignInSupervisorComponent } from "./components/SignInSupervisorComponent";
import { useState } from "react";
import { SignInAlchemistComponent } from "./components/SignInAlchemistComponent";
import { useAuth } from "./jwt/AuthProviderJWT";

function App() {

  const [showDifForms, setShowDifForms] = useState<"login" | "register" | null>(null);
  const { token, role, setToken } = useAuth();

  const HandleSignSuccess = (role: "Supervisor" | "Alchemist") => {
    setToken("token-fullmetal", role);
  };

  if (!token) {
    return (
      <div className="min-h-screen flex flex-col bg-cover bg-center items-center justify-center gap-6 p-6" style={{backgroundImage: "url('https://images5.alphacoders.com/140/thumb-1920-1401914.jpg')"}}>
        <div>
          <h6 className="text-4xl font-extrabold text-black mb-6 tracking-wide">
            Bienvenido Al Sistema Del Departamento De Alquimia Estatal
          </h6>
        </div>
          <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl justify-center items-stretch min-h-[500px]">
            {showDifForms != "register" && (
            <div className="flex-1 bg-white/60 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
              <h6 className="text-4xl font-extrabold text-black mb-6 tracking-wide text-center">
                Entra Aqui Si Eres Supervisor
              </h6>
              <div className="flex justify-center">
                <SignInSupervisorComponent onLoginSuccess={HandleSignSuccess} />;
              </div>
            </div>
            )}

          <div className="flex-1 bg-white/60 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center h-full">
            <h6 className="text-4xl font-extrabold text-black mb-6 tracking-wide text-center">
              Entra Aqui Si Eres Un Alquimista
            </h6>
            <div className="flex justify-center">
              <SignInAlchemistComponent onLoginSuccess={HandleSignSuccess} ActForm={showDifForms ?? "login"} onChangeFormMode={setShowDifForms}  />;
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <nav className="p-4 bg-linear-to-br from-rose-500 to-rose-950 text-white text-2xl items-center justify-center flex gap-6">
        <NavLink to="/" className={({ isActive }) => isActive ? "font-bold" : "text-black font-semibold"}>
          Informacion General. 
        </NavLink>

        {role === "Supervisor" && (
        <NavLink to="/Log-In" className={({ isActive }) => isActive ? "font-bold" : "text-black font-semibold"}>
          Registro De Alquimistas.
        </NavLink>
        )}

        <NavLink to="/DashBoard-Management" className={({ isActive }) => isActive ? "font-bold" : "text-black font-semibold"}>
          Panel De Control.
        </NavLink>

        {role === "Supervisor" && (
        <NavLink to="/Auditorium-History" className={({ isActive }) => isActive ? "font-bold" : "text-black font-semibold"}>
          Historial De Auditorias.
        </NavLink>
        )}

        <button onClick={() => setToken(null, null)} className="p-4 bg-linear-to-br bg-rose-700 hover:bg-rose-900 text-black font-semibold px-4 py-2 rounded-md shadow-md transition duration-200 transform hover:scale-105 cursor-pointer">
          Cerrar Sesion
        </button>
      </nav>

      <Routes>
        <Route path="/" element={<InformationComponent />} />
        <Route path="/Log-In" element={<AlchemistFunctions />} />
        <Route path="/DashBoard-Management" element={<DashBoardComponent />} />
        <Route path="Auditorium-History" element={<AuditoryDashboard />} />
      </Routes>
    </>
  );
}

export default App;
