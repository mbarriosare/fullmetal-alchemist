
import { useState } from "react";
import Swal from "sweetalert2";
import type { ResponseTransmutation } from "../models/TransmutationModel";

const ShowErrorTransmutationForm = (title: string, text: string) => {
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

const ShowSuccessTransmutationForm = (title: string, text: string) => {
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

function TransmutationRecordForm() {

    const [materialid, setMaterialid] = useState<number>(0);
    const [transmutationdescription, setTransmutationdescription] = useState<string>("");

    const HandleExceptionTransmutationNoID = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!materialid || materialid <= 0) {
            ShowErrorTransmutationForm("Ingreso Del ID Del Material.", "Debes Colocar Al Menos Un ID Para Simular La Transmutacion A Un Material!.");
            return;
        }

        if(!transmutationdescription) {
            ShowErrorTransmutationForm("Ingreso De Descripcion.", "Debes Colocar Una Descripcion De Transmutacion!.");
            return;
        }

        try {
            const TransmutationCreateResponse = await fetch(`${API_URL}/transmutation`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    AlchemicalMaterial_ID:  materialid,
                    Description:            transmutationdescription,
                })
        });
        if (!TransmutationCreateResponse.ok) {
            ShowErrorTransmutationForm("Error De Peticion.", "No Se Pudo Realizar La Peticion Al Servidor.");
        }
        else {
            ShowSuccessTransmutationForm("Solicitud De Transmutacion.","La Transmutacion Ha Sido Solicitada Con Exito!.");
        }
        } catch(error) {
            ShowErrorTransmutationForm("Error.", "Problemas Con El Envio De Datos.");
        }
    };

    const HandleMaterialIDException = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetMaterialID = Number(e.target.value);
        setMaterialid(TargetMaterialID);
    };

    const HandleDescriptionException = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetDescription = e.target.value;
        setTransmutationdescription(TargetDescription);
    };

    return (
        <form onSubmit={HandleExceptionTransmutationNoID} className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-xl shadow-2xl p-8 space-y-6">
        
        <h3 className="text-3xl font-extrabold text-center text-slate-800">
            Solicitud De Transmutacion
        </h3>

        <div className="flex flex-col space-y-3">
            <label htmlFor="materialid" className="font-bold text-red-800 text-center">
                Ingresa El ID Del Material Alquimico A Simular La Transmutacion
            </label>

            <input onChange = {HandleMaterialIDException} type="number" id="materialid" placeholder="Ej: 1, 2, 3, 4, 5..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div className="flex flex-col space-y-3">
            <label htmlFor="transdescription" className="font-bold text-red-800 text-center">
                Cual Es La Descripcion De La Transmutacion
            </label>

            <input onChange = {HandleDescriptionException} type="text" id="transdescription" placeholder="Ej: Poder Alquimico..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div>
            <button type="submit" className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md cursor-pointer transition-transform duration-200 shadow-md hover:scale-[1.02]">
                Solicitud De Transmutacion
            </button>
        </div>
    </form>
    );
}

function TransmutationDeleteForm() {

    const [transmutationid, setTransmutationid] = useState<number>(0);

    const HandleExceptionTransmutationID = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!transmutationid || transmutationid <= 0) {
            ShowErrorTransmutationForm("Ingreso Del Numero De Transmutacion.", "Debes Colocar El Numero De Transmutacion A Eliminar!.");
            return;
        }
        try {
            const TransmutationDeleteResponse = await fetch(`${API_URL}/transmutation/${transmutationid}`, {
                method: "DELETE",
            });
        if(!TransmutationDeleteResponse.ok) {
            ShowErrorTransmutationForm("Error De Peticion.", "No Se Pudo Realizar La Peticion Al Servidor.");
        }
        else {
            ShowSuccessTransmutationForm("Modificacion / Eliminacion De Transmutacion.","La Transmutacion Ha Sido Modificada O Eliminada Con Exito!.");
        }
        } catch (error) {
            ShowErrorTransmutationForm("Error.", "Problemas Con El Envio De Datos.");
        }
    };

    const HandleIDException = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetID = Number(e.target.value);
        setTransmutationid(TargetID);
    };

    return (
        <form onSubmit={HandleExceptionTransmutationID} className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-xl shadow-2xl p-8 space-y-6">
        
        <h3 className="text-3xl font-extrabold text-center text-slate-800">
            Eliminacion De Transmutacion
        </h3>

        <div className="flex flex-col space-y-3">
            <label htmlFor="transdelid" className="font-bold text-red-800 text-center">
                Ingresa El ID De La Transmutacion A Eliminar
            </label>

            <input onChange = {HandleIDException} type="number" id="transdelid" placeholder="Ej: 1, 2, 3, 4, 5..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div>
            <button type="submit" className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md cursor-pointer transition-transform duration-200 shadow-md hover:scale-[1.02]">
                Eliminar La Transmutacion
            </button>
        </div>
    </form>
    );
}

function TransmutationQueryForm() {
    
    const [transmutations, setTransmutations] = useState<ResponseTransmutation[] | null>(null);
    const [showTransmutations, setShowTransmutations] = useState<boolean>(false);

    const TransmutationsQueryHandler = async () => {
        setShowTransmutations(false);
        try {
            const TransmutationQueryResponse = await fetch(`${API_URL}/transmutation`, {
                method: "GET"});
            if (!TransmutationQueryResponse.ok) {
                ShowErrorTransmutationForm("Error De Petición", "No Se Pudo Realizar La Petición Al Servidor.");
                setTransmutations([]);
                return;
            }
            const Transmutations: ResponseTransmutation[] = await TransmutationQueryResponse.json();
            setTransmutations(Transmutations);
            ShowSuccessTransmutationForm("Consulta De Transmutaciones", "Las Transmutaciones Se Han Consultado Correctamente.");
        } catch (error) {
            ShowErrorTransmutationForm("Error", "Problemas Con La Conexion Al Servidor.");
            setTransmutations([]);
        } finally {
            setShowTransmutations(true);
        }
    };

    return (
        <div className = "w-full max-w-4xl bg-white/40 backdrop-blur-md rounded-xl shadow-lg p-5 min-h-[400px]">
            <button onClick={TransmutationsQueryHandler} className="w-full justify-items-center py-2 bg-slate-400 hover:bg-slate-500 text-black font-bold rounded-md shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer">
                !Realiza Tu Consulta Aqui De Transmutaciones!
            </button>

            {showTransmutations && transmutations && transmutations.length > 0 && (
                <div className="mt-4 space-y-4"> {transmutations.map((transmutation) => (
                    <div key={transmutation.Transmutation_ID} className="p-4 bg-white/50 backdrop-blur-md rounded-lg shadow-md">
                        <h3 className="text-3xl text-center text-red-800 font-bold">Transmutacion Numero: {transmutation.Transmutation_ID}</h3>
                            <p className="text-xl text-justify text-black font-bold">Descripcion De La Transmutacion: {transmutation.Transmutation_Description}</p>
                            <p className="text-xl text-justify text-black font-bold">Estado Actual De La Transmutacion: {transmutation.Transmutation_Status}</p>
                            <p className="text-xl text-justify text-black font-bold">Resultado De La Transmutacion: {transmutation.Transmutation_Result}</p>
                            <p className="text-xl text-justify text-black font-bold">Nombre Del Material Involucrado: {transmutation.Alchemical_Material?.Material_Name}</p>
                            <p className="text-xl text-justify text-black font-bold">ID Del Material Involucrado: {transmutation.Alchemical_Material.Material_ID}</p>
                            <p className="text-xl text-justify text-black font-bold">Nombre Del Alquimista Relacionado: {transmutation.Alchemical_Material.Alchemist.Alchemist_Name || "N/A"}</p>
                        </div>
                    ))}
                </div>
            )}

            {showTransmutations && transmutations?.length === 0 && (
                <div className="text-2xl text-center text-black font-bold pt-5 pb-5">
                    No Hay Transmutaciones Disponibles En El Momento
                </div>
            )}
        </div>
    );
}

export { TransmutationRecordForm, TransmutationDeleteForm, TransmutationQueryForm };
