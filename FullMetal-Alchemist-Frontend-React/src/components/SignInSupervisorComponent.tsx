
import { useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../jwt/AuthProviderJWT";

interface SignInComponentProps {
    onLoginSuccess?: (role: "Supervisor" | "Alchemist") => void;
}

const API_URL = import.meta.env.VITE_API_URL;

function SignInSupervisorComponent({ onLoginSuccess }: SignInComponentProps ) {
    
    const[username, setUsername] = useState<string>("");
    const[userpass, setUserpass] = useState<string>("");
    const{ setToken } = useAuth();

    const ShowErrorAlertSign = (title: string, text: string) => {
        Swal.fire({
            position: "top",
            title,
            text,
            icon: "error",
            background: "#ffe5e5",
            color: "#b30000",
            confirmButtonText: "Aceptar",
            showConfirmButton: true,
            draggable: true,
            confirmButtonColor: "#b30000"
        });
    };
    
    const ShowSuccessAlertSign = (title: string, text: string) => {
        Swal.fire({
            position: "top",
            title,
            text,
            icon: "success",
            background: "#d4f7dc",
            color: "#145214",
            confirmButtonText: "Aceptar",
            showConfirmButton: true,
            draggable: true,
            confirmButtonColor: "#2ecc71"
        });
    };

    const HandleExceptionEmptySign = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!username) {
            ShowErrorAlertSign("Nombre De Usuario.", "Debes Colocar Tu Nombre De Usuario.");
            return;
        }

        if(!userpass) {
            ShowErrorAlertSign("Contraseña.", "Debes Colocar Tu Contraseña.");
            return;
        }

        try {
            const SupervisorsResponse = await fetch(`${API_URL}/supervisor`, {
                method: "GET",
            });
            if(!SupervisorsResponse.ok) {
                ShowErrorAlertSign("Error De Peticion.", "No Se Pudo Realizar La Peticion Al Servidor.");
            }
            const Supervisors = await SupervisorsResponse.json()

            const Supervisor = Supervisors.find((s: any) => s.Supervisor_Name.toLowerCase() === username.toLowerCase());

            if (!Supervisor) {
                ShowErrorAlertSign("Usuario.", "El Usuario No Coincide.");
                return;
            }

            if (Supervisor.Supervisor_Password !== userpass) {
                ShowErrorAlertSign("Contraseña.", "La Contraseña Ingresada Es Incorrecta.");
                return;
            }
            if (onLoginSuccess) {
                const FakeToken = "";
                setToken(FakeToken, "Supervisor");
                onLoginSuccess("Supervisor");
                ShowSuccessAlertSign("Inicio De Sesion.", "Inicio De Sesion Exitoso!.");
            }
        } catch (error) {
            ShowErrorAlertSign("Error.", "Problemas Con El Envio De Datos.");
        }
    };

    const HandleNameExceptionSign = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetName = e.target.value;
        setUsername(TargetName);
    };

    const HandlePasswordExceptionSign = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetPass = e.target.value;
        setUserpass(TargetPass);
    };

    return (
        <form onSubmit={HandleExceptionEmptySign} className="w-full max-w-md bg-white/100 backdrop-blur-md rounded-xl shadow-2xl p-8 space-y-6">
        
        <h3 className="text-3xl font-extrabold text-center text-slate-800">
            Inicio De Sesion Para Supervisores Al Sistema
        </h3>

        <div className="flex flex-col space-y-3">
            <label htmlFor="usernamesupervisor" className="font-bold text-red-800 text-center">
                Ingresa Tu Nombre Completo
            </label>

            <input value = {username} onChange = {HandleNameExceptionSign} type="text" id="usernamesupervisor" placeholder="Nombre Completo..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div className="flex flex-col space-y-3">
            <label htmlFor="userpasssupervisor" className="font-bold text-red-800 text-center">
                Ingresa Tu Contraseña
            </label>

            <input value = {userpass} onChange = {HandlePasswordExceptionSign} type="password" id="userpasssupervisor" placeholder="Contraseña..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div>
            <button type="submit" className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md cursor-pointer transition-transform duration-200 shadow-md hover:scale-[1.02]">
                Iniciar Sesion
            </button>
        </div>
    </form>
    );
}

export { SignInSupervisorComponent };
