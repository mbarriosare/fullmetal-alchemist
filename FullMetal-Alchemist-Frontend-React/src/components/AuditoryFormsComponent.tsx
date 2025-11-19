
import { useState } from "react";
import Swal from "sweetalert2";
import type { ResponseAuditory } from "../models/AuditoryModel";

const ShowErrorAuditForm = (title: string, text: string) => {
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

const ShowSuccessAuditForm = (title: string, text: string) => {
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

function AuditoryDeleteForm() {

    const [auditoryid, setAuditoryid] = useState<number>(0);

    const HandleExceptionDeleteAlchemist = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!auditoryid || auditoryid <= 0) {
            ShowErrorAuditForm("Ingreso Del ID De Auditoria.", "Debes Colocar El ID De La Auditoria A Eliminar!.");
            return;
        }
        try {
            const AuditoryDeleteResponse = await fetch(`${API_URL}/auditory/${auditoryid}`, {
                method: "DELETE",
            });
        if(!AuditoryDeleteResponse.ok) {
            ShowErrorAuditForm("Error De Peticion.", "No Se Pudo Realizar La Peticion Al Servidor.");
        }
        else {
            ShowSuccessAuditForm("Eliminacion De Auditoria.","Auditoria Eliminada Con Exito!.");
        }
        } catch (error) {
            ShowErrorAuditForm("Error.", "Problemas Con El Envio De Datos.");
        }
    };

    const HandleIDException = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetID = Number(e.target.value);
        setAuditoryid(TargetID);
    };

    return (
        <form onSubmit={HandleExceptionDeleteAlchemist} className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-xl shadow-2xl p-8 space-y-6">
        
        <h3 className="text-3xl font-extrabold text-center text-slate-800">
            Eliminacion De Auditoria
        </h3>

        <div className="flex flex-col space-y-3">
            <label htmlFor="auditorydelid" className="font-bold text-red-800 text-center">
                Ingresa El ID De La Auditoria A Eliminar
            </label>

            <input onChange = {HandleIDException} type="number" id="auditorydelid" placeholder="Ej: 1, 2, 3, 4, 5..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div>
            <button type="submit" className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md cursor-pointer transition-transform duration-200 shadow-md hover:scale-[1.02]">
                Eliminar La Auditoria
            </button>
        </div>
    </form>
    );
}

function AuditoryQueryForm() {
    
    const [auditories, setAuditories] = useState<ResponseAuditory[] | null>(null);
    const [showAuditories, setShowAuditories] = useState<boolean>(false);
    
    const AuditoryQueryHandler = async () => {
        setShowAuditories(false);
        try {
            const AuditoryQueryResponse = await fetch(`${API_URL}/auditory`, {
                method: "GET"});
            if (!AuditoryQueryResponse.ok) {
                ShowErrorAuditForm("Error De Petición", "No Se Pudo Realizar La Petición Al Servidor.");
                setAuditories([]);
                return;
            }
            const Auditories: ResponseAuditory[] = await AuditoryQueryResponse.json();
            setAuditories(Auditories);
            ShowSuccessAuditForm("Consulta De Auditorias", "Las Auditorias Se Han Consultado Correctamente.");
        } catch (error) {
            ShowErrorAuditForm("Error", "Problemas Con La Conexion Al Servidor.");
            setAuditories([]);
        } finally {
            setShowAuditories(true);
        }
    };
    
    return (
        <div className = "w-full max-w-4xl bg-white/40 backdrop-blur-md rounded-xl shadow-lg p-5 min-h-[400px]">
            <button onClick={AuditoryQueryHandler} className="w-full justify-items-center py-2 bg-slate-400 hover:bg-slate-500 text-black font-bold rounded-md shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer">
                !Realiza Tu Consulta Aqui De Auditorias!
            </button>
    
            {showAuditories && auditories && auditories.length > 0 && (
                <div className="mt-4 space-y-4"> {auditories.map((auditory) => (
                    <div key={auditory.Auditory_ID} className="p-4 bg-white/50 backdrop-blur-md rounded-lg shadow-md">
                        <h3 className="text-3xl text-center text-red-800 font-bold">Auditoria Numero: {auditory.Auditory_ID}</h3>
                            <p className="text-xl text-justify text-black font-bold">Descripcion De La Auditoria: {auditory.Auditory_Description}</p>
                            <p className="text-xl text-justify text-black font-bold">Estado De La Auditoria: {auditory.Auditory_Status}</p>
                            <p className="text-xl text-justify text-black font-bold">Fecha De Creacion De La Auditoria: {auditory.Auditory_Created_At}</p>
                            <p className="text-xl text-justify text-black font-bold">ID De La Transmutacion Involucrada: {auditory.Transmutation.Transmutation_ID}</p>
                            <p className="text-xl text-justify text-black font-bold">Descripcion De La Transmutacion Involucrada: {auditory.Transmutation.Transmutation_Description}</p>
                            <p className="text-xl text-justify text-black font-bold">ID Del Material Alquimico Utilizado: {auditory.Transmutation.Alchemical_Material.Material_ID}</p>
                            <p className="text-xl text-justify text-black font-bold">Nombre Del Material Alquimico Relacionado: {auditory.Transmutation.Alchemical_Material.Material_Name}</p>
                            <p className="text-xl text-justify text-black font-bold">Rareza Del Material Alquimico Transmutado: {auditory.Transmutation.Alchemical_Material.Material_Rarity}</p>
                            <p className="text-xl text-justify text-black font-bold">ID Del Alquimista Solicitante: {auditory.Transmutation.Alchemical_Material.Alchemist.Alchemist_ID}</p>
                            <p className="text-xl text-justify text-black font-bold">Nombre Del Alquimista Relacionado: {auditory.Transmutation.Alchemical_Material.Alchemist.Alchemist_Name}</p>
                            <p className="text-xl text-justify text-black font-bold">Rango Del Alquimista Solicitante: {auditory.Transmutation.Alchemical_Material.Alchemist.Alchemist_Rank}</p>
                        </div>
                    ))}
                </div>
            )}
    
            {showAuditories && auditories?.length === 0 && (
                <div className="text-2xl text-center text-black font-bold pt-5 pb-5">
                    No Hay Auditorias Disponibles En El Momento
                </div>
            )}
        </div>
    );
}

export { AuditoryDeleteForm, AuditoryQueryForm }
