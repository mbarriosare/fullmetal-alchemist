
import { useState } from "react";
import Swal from "sweetalert2";
import type { ResponseMission } from "../models/MissionModel";

const ShowErrorMissionForm = (title: string, text: string) => {
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

const ShowSuccessMissionForm = (title: string, text: string) => {
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

const API_URL = import.meta.env.VITE_API_URL;

function MissionCreateForm() {

    const [alchemistid, setAlchemistid] = useState<number>(0);
    const [missiontitle, setMissiontitle] = useState<string>("");
    const [missionstatus, setMissionstatus] = useState<string>("");
    const [missiondescription, setMissiondescription] = useState<string>("");

    const HandleExceptionMissionNoID = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!alchemistid || alchemistid <= 0) {
            ShowErrorMissionForm("Ingreso Del ID De La Mision.", "Debes Colocar Al Menos Un ID Para La Mision!.");
            return;
        }

        if(!missiontitle) {
            ShowErrorMissionForm("Ingreso Del Titulo De Mision.", "Debes Colocar Al Menos Un Titulo Para La Mision!.");
            return;
        }

        if(!missionstatus) {
            ShowErrorMissionForm("Ingreso Del Estado De Mision.", "Debes Colocar Un Estado Para La Mision!.");
            return;
        }

        if(!missiondescription) {
            ShowErrorMissionForm("Ingreso De Descripcion De Mision.", "Debes Colocar Una Descripcion Para La Mision!.");
            return;
        }

        try {
            const MissionCreateResponse = await fetch(`${API_URL}/mission`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    Alchemist_ID:    alchemistid,
                    Title:           missiontitle,
                    Status:          missionstatus,
                    Description:     missiondescription,
                })
        });
        if (!MissionCreateResponse.ok) {
            ShowErrorMissionForm("Error De Peticion.", "No Se Pudo Realizar La Peticion Al Servidor.");
        }
        else {
            ShowSuccessMissionForm("Creacion De Mision.","La Mision Ha Sido Creada Con Exito!.");
        }
        } catch(error) {
            ShowErrorMissionForm("Error.", "Problemas Con El Envio De Datos.");
        }
    };

    const HandleIDException = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetID = Number(e.target.value);
        setAlchemistid(TargetID);
    }

    const HandleTitleException = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetTitle = e.target.value;
        setMissiontitle(TargetTitle);
    };

    const HandleStatusException = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetStatus = e.target.value;
        setMissionstatus(TargetStatus);
    };

    const HandleDescriptionException = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetDescription = e.target.value;
        setMissiondescription(TargetDescription);
    };

    return (
        <form onSubmit={HandleExceptionMissionNoID} className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-xl shadow-2xl p-8 space-y-6">
        
        <h3 className="text-3xl font-extrabold text-center text-slate-800">
            Creacion De Mision
        </h3>

        <div className="flex flex-col space-y-3">
            <label htmlFor="alchemistid" className="font-bold text-red-800 text-center">
                Ingresa El ID Del Alquimista A Asignar La Mision
            </label>

            <input onChange = {HandleIDException} type="number" id="alchemistid" placeholder="Ej: 1, 2, 3, 4, 5..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div className="flex flex-col space-y-3">
            <label htmlFor="missiontitle" className="font-bold text-red-800 text-center">
                ¿Cual Es El Titulo De La Mision?
            </label>

            <input onChange = {HandleTitleException} type="text" id="missiontitle" placeholder="Ej: Exploración..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div className="flex flex-col space-y-3">
            <label htmlFor="missionstatus" className="font-bold text-red-800 text-center">
                Coloca El Estado De La Mision
            </label>

            <input onChange = {HandleStatusException} type="text" id="missionstatus" placeholder="Ej: Activo..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>
        
	    <div className="flex flex-col space-y-3">
            <label htmlFor="missiondescription" className="font-bold text-red-800 text-center">
                ¿Descripcion De La Mision?
            </label>

            <input onChange = {HandleDescriptionException} type="text" id="missiondescription" placeholder="Ej: Exploracion Y Busqueda De Materiales..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div>
            <button type="submit" className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md cursor-pointer transition-transform duration-200 shadow-md hover:scale-[1.02]">
                Crear La Nueva Mision
            </button>
        </div>
    </form>
    );
}

function MissionModifyForm() {

    const [alchemistid, setAlchemistid] = useState<number>(0);
    const [missiontitle, setMissiontitle] = useState<string>("");
    const [missionstatus, setMissionstatus] = useState<string>("");
    const [missiondescription, setMissiondescription] = useState<string>("");

    const HandleExceptionMissionID = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!alchemistid || alchemistid <= 0) {
            ShowErrorMissionForm("Ingreso Del Numero De Mision.", "Debes Colocar El Numero De Mision A Modificar!.");
            return;
        }

        if(!missiontitle) {
            ShowErrorMissionForm("Ingreso Del Titulo De Mision.", "Debes Colocar Un Titulo Para La Modificacion De La Mision!.");
            return;
        }

        if(!missionstatus) {
            ShowErrorMissionForm("Ingreso Del Estado De Mision.", "Debes Colocar Un Estado Para La Modificacion De La Mision!.");
            return;
        }

        if(!missiondescription) {
            ShowErrorMissionForm("Ingreso De Descripcion De Mision.", "Debes Colocar Una Descripcion Para Modificar La Mision!.");
            return;
        }

        try {
            const MissionModifyResponse = await fetch(`${API_URL}/mission/${alchemistid}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    Alchemist_ID:    alchemistid,
                    Title:           missiontitle,
                    Status:          missionstatus,
                    Description:     missiondescription,
                })
        });
        if(!MissionModifyResponse.ok) {
            ShowErrorMissionForm("Error De Peticion.", "No Se Pudo Realizar La Peticion Al Servidor.");
        }
        else {
            ShowSuccessMissionForm("Modificacion / Eliminacion De Mision.","La Mision Ha Sido Modificada O Eliminada Con Exito!.");
        }
        } catch(error) {
            ShowErrorMissionForm("Error.", "Problemas Con El Envio De Datos.");
        }
    };

    const HandleIDException = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetID = Number(e.target.value);
        setAlchemistid(TargetID);
    };

    const HandleTitleException = (e: React.ChangeEvent<HTMLInputElement>) => {
    const TargetTitle = e.target.value;
        setMissiontitle(TargetTitle);
    };

    const HandleStatusException = (e: React.ChangeEvent<HTMLInputElement>) => {
    const TargetStatus = e.target.value;
        setMissionstatus(TargetStatus);
    };

    const HandleDescriptionException = (e: React.ChangeEvent<HTMLInputElement>) => {
    const TargetDescription = e.target.value;
        setMissiondescription(TargetDescription);
    };

    return (
        <form onSubmit={HandleExceptionMissionID} className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-xl shadow-2xl p-8 space-y-6">
        
        <h3 className="text-3xl font-extrabold text-center text-slate-800">
            Modificacion De Mision
        </h3>

        <div className="flex flex-col space-y-3">
            <label htmlFor="alchemistid" className="font-bold text-red-800 text-center">
                Ingresa El ID De La Mision A Modificar
            </label>

            <input onChange = {HandleIDException} type="number" id="alchemistid" placeholder="Ej: 1, 2, 3, 4, 5..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div className="flex flex-col space-y-3">
            <label htmlFor="missionmodtitle" className="font-bold text-red-800 text-center">
                Ingresa Un Nuevo Titulo Para La Mision
            </label>

            <input onChange = {HandleTitleException} type="text" id="missionmodtitle" placeholder="Ej: Exploración..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div className="flex flex-col space-y-3">
            <label htmlFor="missionmodstatus" className="font-bold text-red-800 text-center">
                Cambia El Estado De La Mision
            </label>

            <input onChange = {HandleStatusException} type="text" id="missionmodstatus" placeholder="Ej: Pendiente..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

	    <div className="flex flex-col space-y-3">
            <label htmlFor="missionmoddescription" className="font-bold text-red-800 text-center">
                Inserta Una Nueva Descripcion De Mision
            </label>

            <input onChange = {HandleDescriptionException} type="text" id="missionmoddescription" placeholder="Ej: Aventura De Alquimistas..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div>
            <button type="submit" className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md cursor-pointer transition-transform duration-200 shadow-md hover:scale-[1.02]">
                Modificar La Mision
            </button>
        </div>
    </form>
    );
}

function MissionDeleteForm() {

    const [missionid, setMissionid] = useState<number>(0);

    const HandleExceptionMissionID = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!missionid || missionid <= 0) {
            ShowErrorMissionForm("Ingreso Del Numero De Mision.", "Debes Colocar El Numero De Mision A Eliminar!.");
            return;
        }
        try {
            const MissionDeleteResponse = await fetch(`${API_URL}/mission/${missionid}`, {
                method: "DELETE",
            });
        if(!MissionDeleteResponse.ok) {
            ShowErrorMissionForm("Error De Peticion.", "No Se Pudo Realizar La Peticion Al Servidor.");
        }
        else {
            ShowSuccessMissionForm("Modificacion / Eliminacion De Mision.","La Mision Ha Sido Modificada O Eliminada Con Exito!.");
        }
        } catch (error) {
            ShowErrorMissionForm("Error.", "Problemas Con El Envio De Datos.");
        }
    };

    const HandleIDException = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetID = Number(e.target.value);
        setMissionid(TargetID);
    };

    return (
        <form onSubmit={HandleExceptionMissionID} className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-xl shadow-2xl p-8 space-y-6">
        
        <h3 className="text-3xl font-extrabold text-center text-slate-800">
            Eliminacion De Mision
        </h3>

        <div className="flex flex-col space-y-3">
            <label htmlFor="missiondelid" className="font-bold text-red-800 text-center">
                Ingresa El ID De La Mision Para Eliminarla
            </label>

            <input onChange = {HandleIDException} type="number" id="missiondelid" placeholder="Ej: 1, 2, 3, 4, 5..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div>
            <button type="submit" className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md cursor-pointer transition-transform duration-200 shadow-md hover:scale-[1.02]">
                Eliminar La Mision
            </button>
        </div>
    </form>
    );
}

function MissionQueryForm() {
    
    const [missions, setMissions] = useState<ResponseMission[] | null>(null);
    const [showMissions, setShowMissions] = useState<boolean>(false);

    const MissionQueryHandler = async () => {
        setShowMissions(false);
        try {
            const MissionQueryResponse = await fetch(`${API_URL}/mission`, {
                method: "GET"});
            if (!MissionQueryResponse.ok) {
                ShowErrorMissionForm("Error De Petición", "No Se Pudo Realizar La Petición Al Servidor.");
                setMissions([]);
                return;
            }
            const Missions: ResponseMission[] = await MissionQueryResponse.json();
            setMissions(Missions);
            ShowSuccessMissionForm("Consulta De Misiones", "Las Misiones Se Han Consultado Correctamente.");
        } catch (error) {
            ShowErrorMissionForm("Error", "Problemas Con La Conexion Al Servidor.");
            setMissions([]);
        } finally {
            setShowMissions(true);
        }
    };

    return (
        <div className = "w-full max-w-4xl bg-white/40 backdrop-blur-md rounded-xl shadow-lg p-5 min-h-[400px]">
            <button onClick={MissionQueryHandler} className="w-full justify-items-center py-2 bg-slate-400 hover:bg-slate-500 text-black font-bold rounded-md shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer">
                !Realiza Tu Consulta Aqui De Misiones!
            </button>

            {showMissions && missions && missions.length > 0 && (
                <div className="mt-4 space-y-4"> {missions.map((mission) => (
                    <div key={mission.Mission_ID} className="p-4 bg-white/50 backdrop-blur-md rounded-lg shadow-md">
                        <h3 className="text-3xl text-center text-red-800 font-bold">{mission.Mission_Title}</h3>
                            <p className="text-xl text-justify text-black font-bold">ID De Mision: {mission.Mission_ID}</p>
                            <p className="text-xl text-justify text-black font-bold">Estado De Mision: {mission.Mission_Status}</p>
                            <p className="text-xl text-justify text-black font-bold">Descripcion De Mision: {mission.Mission_Description}</p>
                            <p className="text-xl text-justify text-black font-bold">Fecha De Creacion De Mision: {mission.Mission_Created_At}</p>
                            <p className="text-xl text-justify text-black font-bold">Alquimista Asignado Con La Mision: {mission.Alchemist.Alchemist_Name}</p>
                            <p className="text-xl text-justify text-black font-bold">ID Del Alquimista Relacionado Con La Mision: {mission.Alchemist.Alchemist_ID}</p>
                        </div>
                    ))}
                </div>
            )}

            {showMissions && missions?.length === 0 && (
                <div className="text-2xl text-center text-black font-bold pt-5 pb-5">
                    No Hay Misiones Disponibles En El Momento
                </div>
            )}
        </div>
    );
}

export { MissionCreateForm, MissionModifyForm, MissionDeleteForm, MissionQueryForm };
