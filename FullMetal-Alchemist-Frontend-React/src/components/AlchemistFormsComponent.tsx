
import { useState } from "react";
import Swal from "sweetalert2";
import type { ResponseAlchemist } from "../models/AlchemistModel";

const ShowErrorAlertForm = (title: string, text: string) => {
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

const ShowSuccessAlertForm = (title: string, text: string) => {
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

interface CreateAlchemistFormProps {
    onClose: () => void;
}

const API_URL = import.meta.env.VITE_API_URL;

function CreateAlchemistForm({onClose}: CreateAlchemistFormProps) {
    const[user, setUser] = useState<string | null>(null);
    const[spec, setSpec] = useState<string | null>(null);
    const[rank, setRank] = useState<string | null>(null);
    const[password, setPassword] = useState<string | null>(null);
    const[passvalidation, setPassvalidation] = useState<string | null>(null);

    const HandleExceptionAlchemist = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!user) {
            ShowErrorAlertForm("Ingreso Del Nombre.", "Debes Colocar Al Menos Un Nombre De Alquimista!.");
            return;
        }

        if(!spec) {
            ShowErrorAlertForm("Ingreso De La Especialidad.", "Debes Colocar Una Especialidad Para El Alquimista!.");
            return;
        }

        if(!rank) {
            ShowErrorAlertForm("Ingreso Del Rango.", "Debes Colocar Un Rango Actual De Alquimista!.");
            return;
        }

        if(!password) {
            ShowErrorAlertForm("Ingreso De La Contraseña.", "Debes Introducir Una Contraseña Primero!.");
            return;
        }
        else if(password.length < 7) {
            ShowErrorAlertForm("Ingreso De La Contraseña.", "La Contraseña Debe Tener Al Menos 7 Caracteres Validos!.");
            return;
        }

        if(!passvalidation ) {
            ShowErrorAlertForm("Validacion De Contraseña.", "Debes Introducir La Contraseña Nuevamente!.");
            return;
        }
        else if(passvalidation !== password) {
            ShowErrorAlertForm("Validacion De Contraseña.", "La Contraseña Debe Ser Igual Que La Que Se Ha Puesto!.");
            return;
        }

        try {
            const AlchemistCreateResponse = await fetch(`${API_URL}/alchemist`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    Name: user,
                    Speciality: spec,
                    Rank: rank,
                    Password: password,
                })
        });
        if (!AlchemistCreateResponse.ok) {
            ShowErrorAlertForm("Error De Peticion.", "No Se Pudo Realizar La Peticion Al Servidor.");
        }
        else {
            ShowSuccessAlertForm("Registro De Alquimista.", "Alquimista Creado Con Exito!.");
        }
        } catch(error) {
            ShowErrorAlertForm("Error.", "Problemas Con El Envio De Datos.");
        }
    };

    const HandleUserExceptionForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetUser = e.target.value;
        setUser(TargetUser);
    };

    const HandleSpecExceptionForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetSpec = e.target.value;
        setSpec(TargetSpec);
    };

    const HandleRankExceptionForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetRank = e.target.value;
        setRank(TargetRank);
    };

    const HandlePasswordExceptionForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetPassword = e.target.value;
        setPassword(TargetPassword);
    };

    const HandlePasswordValidationExceptionForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetPasswordValidation = e.target.value;
        setPassvalidation(TargetPasswordValidation);
    };

    return (
        <form onSubmit={HandleExceptionAlchemist} className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-xl shadow-2xl p-8 space-y-6">
            
            <h3 className="text-3xl font-extrabold text-center text-slate-800">
                Formulario De Registro De Alquimistas
            </h3>

        <div className="flex flex-col space-y-3">
            <label htmlFor="Alchemist_Name" className="font-bold text-red-800 text-center">
                Ingresa El Nombre Completo Del Alquimista
            </label>

            <input onChange = {HandleUserExceptionForm} type="text" id="Alchemist_Name" placeholder="Ej: Heinrich McFlair..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div className="flex flex-col space-y-3">
            <label htmlFor="Alchemist_Speciality" className="font-bold text-red-800 text-center">
                ¿Cual Es La Especialidad Del Alquimista?
            </label>

            <input onChange = {HandleSpecExceptionForm} type="text" id="Alchemist_Speciality" placeholder="Ej: Transmutacion De Metales..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div className="flex flex-col space-y-3">
            <label htmlFor="Alchemist_Rank" className="font-bold text-red-800 text-center">
                ¿Que Rango Es El Alquimista?
            </label>

            <input onChange = {HandleRankExceptionForm} type="text" id="Alchemist_Rank" placeholder="Ej: Maestro, Aprendiz, Oficial, Etc..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div className="flex flex-col space-y-3">
            <label htmlFor="Alchemist_Password" className="font-bold text-red-800 text-center">
                Crea Una Contraseña Para El Alquimista
            </label>

            <input onChange = {HandlePasswordExceptionForm} type="password" id="Alchemist_Password" placeholder="Ej: abcd345/*..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div className="flex flex-col space-y-3">
            <label htmlFor="Alchemist_PasswordValidation" className="font-bold text-red-800 text-center">
                Verifica La Contraseña Del Alquimista
            </label>

            <input onChange = {HandlePasswordValidationExceptionForm} type="password" id="Alchemist_PasswordValidation" placeholder="Coloca Aqui La Contraseña Nuevamente..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

            <button type="submit" className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md cursor-pointer transition-transform duration-200 shadow-md hover:scale-[1.02]">
                Registrar Alquimista
            </button>

            <button type="button" onClick={onClose} className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md cursor-pointer transition-transform duration-200 shadow-md hover:scale-[1.02]">
                Volver Al Menu Anterior
            </button>
        </form>
    );
};

function ModifyAlchemistForm() {
    const[id, setId] = useState<number>(0);
    const[user, setUser] = useState<string | null>(null);
    const[spec, setSpec] = useState<string | null>(null);
    const[rank, setRank] = useState<string | null>(null);
    const[password, setPassword] = useState<string | null>(null);
    const[passvalidation, setPassvalidation] = useState<string | null>(null);

    const HandleExceptionModifyAlchemist = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!id || id <= 0) {
            ShowErrorAlertForm("Ingreso De ID.", "Debes Ingresar Un ID Valido Para Modificar El Alquimista!.")
        }

        if(!user) {
            ShowErrorAlertForm("Ingreso Del Nombre.", "Debes Colocar Al Menos Un Nombre Para El Alquimista!.");
            return;
        }

        if(!spec) {
            ShowErrorAlertForm("Ingreso De La Especialidad.", "Debes Colocar La Especialidad Del Alquimista!.");
            return;
        }

        if(!rank) {
            ShowErrorAlertForm("Ingreso Del Rango.", "Debes Colocar El Rango Actual De Alquimista!.");
            return;
        }

        if(!password) {
            ShowErrorAlertForm("Ingreso De La Contraseña.", "Debes Introducir Una Contraseña Primero!.");
            return;
        }
        else if(password.length < 7) {
            ShowErrorAlertForm("Ingreso De La Contraseña.", "La Contraseña Debe Tener Al Menos 7 Caracteres Validos!.");
            return;
        }

        if(!passvalidation ) {
            ShowErrorAlertForm("Validacion De Contraseña.", "Debes Introducir La Contraseña Nuevamente!.");
            return;
        }
        else if(passvalidation !== password) {
            ShowErrorAlertForm("Validacion De Contraseña.", "La Contraseña Debe Ser Igual Que La Que Se Ha Puesto!.");
            return;
        }

        try {
            const AlchemistModifyResponse = await fetch(`${API_URL}/alchemist/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    Alchemist_ID: id,
                    Name: user,
                    Speciality: spec,
                    Rank: rank,
                    Password: password,
                })
        });
        if (!AlchemistModifyResponse.ok) {
            ShowErrorAlertForm("Error De Peticion.", "No Se Pudo Realizar La Peticion Al Servidor.");
        }
        else {
            ShowSuccessAlertForm("Actualizacion De Datos.", "Se Ha Actualizado La Informacion Del Alquimista Con Exito!.");
        }
        } catch(error) {
            ShowErrorAlertForm("Error.", "Problemas Con El Envio De Datos.");
        }
    };

    const HandleIDExceptionForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetID = Number(e.target.value);
        setId(TargetID);
    }

    const HandleUserExceptionForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetUser = e.target.value;
        setUser(TargetUser);
    };

    const HandleSpecExceptionForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetSpec = e.target.value;
        setSpec(TargetSpec);
    };

    const HandleRankExceptionForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetRank = e.target.value;
        setRank(TargetRank);
    };

    const HandlePasswordExceptionForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetPassword = e.target.value;
        setPassword(TargetPassword);
    };

    const HandlePasswordValidationExceptionForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetPasswordValidation = e.target.value;
        setPassvalidation(TargetPasswordValidation);
    };

    return (
        <form onSubmit={HandleExceptionModifyAlchemist} className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-xl shadow-2xl p-8 space-y-6">
            
            <h3 className="text-3xl font-extrabold text-center text-slate-800">
                Actualizacion De Informacion De Alquimistas
            </h3>

        <div className="flex flex-col space-y-3">
            <label htmlFor="Alchemist_ID" className="font-bold text-red-800 text-center">
                Ingresa El ID Del Alquimista A Modificar
            </label>

            <input onChange = {HandleIDExceptionForm} type="number" id="Alchemist_ID" placeholder="Ej: 1, 2, 3, 4, 5..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div className="flex flex-col space-y-3">
            <label htmlFor="Alchemist_ModName" className="font-bold text-red-800 text-center">
                Ingresa Un Nuevo Nombre
            </label>

            <input onChange = {HandleUserExceptionForm} type="text" id="Alchemist_ModName" placeholder="Ej: Heinrich McFlair..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div className="flex flex-col space-y-3">
            <label htmlFor="Alchemist_ModSpeciality" className="font-bold text-red-800 text-center">
                ¿Cual Es La Especialidad Nueva Del Alquimista?
            </label>

            <input onChange = {HandleSpecExceptionForm} type="text" id="Alchemist_ModSpeciality" placeholder="Ej: Transmutacion De Distintos Materiales..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div className="flex flex-col space-y-3">
            <label htmlFor="Alchemist_ModRank" className="font-bold text-red-800 text-center">
                ¿Que Rango Nuevo Tiene El Alquimista Actual?
            </label>

            <input onChange = {HandleRankExceptionForm} type="text" id="Alchemist_ModRank" placeholder="Ej: Maestro, Aprendiz, Oficial, Etc..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div className="flex flex-col space-y-3">
            <label htmlFor="Alchemist_ModPassword" className="font-bold text-red-800 text-center">
                Crea Una Contraseña Nueva Para El Alquimista
            </label>

            <input onChange = {HandlePasswordExceptionForm} type="password" id="Alchemist_ModPassword" placeholder="Ej: abcd345/*..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div className="flex flex-col space-y-3">
            <label htmlFor="Alchemist_ModPasswordValidation" className="font-bold text-red-800 text-center">
                Verifica La Contraseña Nuevamente
            </label>

            <input onChange = {HandlePasswordValidationExceptionForm} type="password" id="Alchemist_ModPasswordValidation" placeholder="Coloca Aqui La Contraseña Nuevamente..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

            <button type="submit" className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md cursor-pointer transition-transform duration-200 shadow-md hover:scale-[1.02]">
                Actualizar La Informacion Del Alquimista
            </button>
        </form>
    );
}

function AlchemistDeleteForm() {

    const [id, setId] = useState<number>(0);

    const HandleExceptionDeleteAlchemist = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!id || id <= 0) {
            ShowErrorAlertForm("Ingreso Del ID Del Alquimista", "Debes Colocar El ID Del Alquimista A Eliminar!.");
            return;
        }
        try {
            const MissionDeleteResponse = await fetch(`${API_URL}/alchemist/${id}`, {
                method: "DELETE",
            });
        if(!MissionDeleteResponse.ok) {
            ShowErrorAlertForm("Error De Peticion.", "No Se Pudo Realizar La Peticion Al Servidor.");
        }
        else {
            ShowSuccessAlertForm("Eliminacion De Alquimista.","Alquimista Eliminado Con Exito!.");
        }
        } catch (error) {
            ShowErrorAlertForm("Error.", "Problemas Con El Envio De Datos.");
        }
    };

    const HandleIDException = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetID = Number(e.target.value);
        setId(TargetID);
    };

    return (
        <form onSubmit={HandleExceptionDeleteAlchemist} className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-xl shadow-2xl p-8 space-y-6">
        
        <h3 className="text-3xl font-extrabold text-center text-slate-800">
            Eliminacion De Alquimista
        </h3>

        <div className="flex flex-col space-y-3">
            <label htmlFor="delid" className="font-bold text-red-800 text-center">
                Ingresa El ID Del Alquimista A Eliminar
            </label>

            <input onChange = {HandleIDException} type="number" id="delid" placeholder="Ej: 1, 2, 3, 4, 5..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div>
            <button type="submit" className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md cursor-pointer transition-transform duration-200 shadow-md hover:scale-[1.02]">
                Eliminar El Alquimista
            </button>
        </div>
    </form>
    );
}

function AlchemistQueryForm() {
    
    const [alchemists, setAlchemists] = useState<ResponseAlchemist[] | null>(null);
    const [showAlchemists, setShowAlchemists] = useState<boolean>(false);
    
        const AlchemistQueryHandler = async () => {
            setShowAlchemists(false);
            try {
                const AlchemistQueryResponse = await fetch(`${API_URL}/alchemist`, {
                    method: "GET"});
                if (!AlchemistQueryResponse.ok) {
                    ShowErrorAlertForm("Error De Petición", "No Se Pudo Realizar La Petición Al Servidor.");
                    setAlchemists([]);
                    return;
                }
                const Alchemists: ResponseAlchemist[] = await AlchemistQueryResponse.json();
                setAlchemists(Alchemists);
                ShowSuccessAlertForm("Consulta De Alquimistas", "Los Alquimistas Se Han Consultado Correctamente.");
            } catch (error) {
                ShowErrorAlertForm("Error", "Problemas Con La Conexion Al Servidor.");
                setAlchemists([]);
            } finally {
                setShowAlchemists(true);
            }
        };
    
        return (
            <div className = "w-full max-w-4xl bg-white/40 backdrop-blur-md rounded-xl shadow-lg p-5 min-h-[400px]">
                <button onClick={AlchemistQueryHandler} className="w-full justify-items-center py-2 bg-slate-400 hover:bg-slate-500 text-black font-bold rounded-md shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer">
                    !Realiza Tu Consulta Aqui De Alquimistas!
                </button>
    
                {showAlchemists && alchemists && alchemists.length > 0 && (
                    <div className="mt-4 space-y-4"> {alchemists.map((alchemist) => (
                        <div key={alchemist.Alchemist_ID} className="p-4 bg-white/50 backdrop-blur-md rounded-lg shadow-md">
                            <h3 className="text-3xl text-center text-red-800 font-bold">{alchemist.Alchemist_Name}</h3>
                                <p className="text-xl text-justify text-black font-bold">ID Del Alquimista: {alchemist.Alchemist_ID}</p>
                                <p className="text-xl text-justify text-black font-bold">Especialidad Del Alquimista: {alchemist.Alchemist_Speciality}</p>
                                <p className="text-xl text-justify text-black font-bold">Rango Del Alquimista: {alchemist.Alchemist_Rank}</p>
                                <p className="text-xl text-justify text-black font-bold">Contraseña Del Alquimista: {alchemist.Alchemist_Password}</p>
                                <p className="text-xl text-justify text-black font-bold">Fecha De Creacion De Usuario Alquimista: {alchemist.Alchemist_Created_At}</p>
                            </div>
                        ))}
                    </div>
                )}
    
                {showAlchemists && alchemists?.length === 0 && (
                    <div className="text-2xl text-center text-black font-bold pt-5 pb-5">
                        No Hay Alquimistas Disponibles En El Momento
                    </div>
                )}
            </div>
        );
}

export { CreateAlchemistForm, ModifyAlchemistForm, AlchemistDeleteForm, AlchemistQueryForm }
