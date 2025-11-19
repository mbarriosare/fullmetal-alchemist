
import { useState } from "react";
import Swal from "sweetalert2";
import { CreateAlchemistForm } from "./AlchemistFormsComponent";
import { useAuth } from "../jwt/AuthProviderJWT";

interface SignInComponentProps {
  onLoginSuccess?: (role: "Supervisor" | "Alchemist") => void;
  ActForm: "login" | "register";
  onChangeFormMode: (Form: "login" | "register" | null) => void;
}

const API_URL = import.meta.env.VITE_API_URL;

function SignInAlchemistComponent({ onLoginSuccess, ActForm, onChangeFormMode }: SignInComponentProps ) {

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
            const AlchemistsResponse = await fetch(`${API_URL}/alchemist`, {
                method: "GET",
            });
            if(!AlchemistsResponse.ok) {
                ShowErrorAlertSign("Error De Peticion.", "No Se Pudo Realizar La Peticion Al Servidor.");
            }
            const Alchemists = await AlchemistsResponse.json()

            const Alchemist = Alchemists.find((s: any) => s.Alchemist_Name.toLowerCase() === username.toLowerCase());

            if (!Alchemist) {
                ShowErrorAlertSign("Usuario.", "El Usuario No Coincide.");
                return;
            }

            if (Alchemist.Alchemist_Password !== userpass) {
                ShowErrorAlertSign("Contraseña.", "La Contraseña Ingresada Es Incorrecta.");
                return;
            }
            if (onLoginSuccess) {
                const FakeToken = "";
                setToken(FakeToken, "Alchemist");
                onLoginSuccess("Alchemist");
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

    if(ActForm === "register") {
        return <CreateAlchemistForm onClose={() => onChangeFormMode(null)} />
    }

    return (
        <form onSubmit={HandleExceptionEmptySign} className="w-full max-w-md bg-white/100 backdrop-blur-md rounded-xl shadow-2xl p-8 space-y-6">
        
        <h3 className="text-3xl font-extrabold text-center text-slate-800">
            Inicio De Sesion Para Alquimistas Al Sistema
        </h3>

        <div className="flex flex-col space-y-3">
            <label htmlFor="username" className="font-bold text-red-800 text-center">
                Ingresa Tu Nombre Completo
            </label>

            <input value = {username} onChange = {HandleNameExceptionSign} type="text" id="username" placeholder="Nombre Completo..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div className="flex flex-col space-y-3">
            <label htmlFor="userpass" className="font-bold text-red-800 text-center">
                Ingresa Tu Contraseña
            </label>

            <input value = {userpass} onChange = {HandlePasswordExceptionSign} type="password" id="userpass" placeholder="Contraseña..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div>
            <button type="submit" className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md cursor-pointer transition-transform duration-200 shadow-md hover:scale-[1.02]">
                Iniciar Sesion
            </button>

            <div>
                <h2 className="font-bold text-red-800 text-center pb-5 pt-5"> ¿No Tienes Una Cuenta?, Crea Una Ahora Mismo!.</h2>
                <button type="button" onClick={() => onChangeFormMode("register")} className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md cursor-pointer transition-transform duration-200 shadow-md hover:scale-[1.02]">
                    Registrate Como Alquimista
                </button>
            </div>
        </div>
    </form>
    );
}

export { SignInAlchemistComponent };
