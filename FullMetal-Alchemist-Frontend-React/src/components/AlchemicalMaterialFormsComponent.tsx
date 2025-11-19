
import { useState } from "react";
import Swal from "sweetalert2";
import type { ResponseAlchemical_Material } from "../models/AlchemicalMaterialModel";

const ShowErrorMaterialForm = (title: string, text: string) => {
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

const ShowSuccessMaterialForm = (title: string, text: string) => {
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

function AlchemicalMaterialRecordForm() {

    const [alchemistid, setAlchemistid] = useState<number>(0);
    const [materialname, setMaterialname] = useState<string>("");
    const [materialdescription, setMaterialdescription] = useState<string>("");
    const [materialquantity, setMaterialquantity] = useState<number>(0);
    const [materialrarity, setMaterialrarity] = useState<string>("");

    const HandleExceptionMaterialNoID = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!alchemistid || alchemistid <= 0) {
            ShowErrorMaterialForm("Ingreso Del ID De Alquimista.", "Debes Colocar Al Menos Un ID Para Asignar El Material A Un Alquimista!.");
            return;
        }

        if(!materialname) {
            ShowErrorMaterialForm("Ingreso Del Nombre Del Material.", "Debes Colocar Al Menos Un Nombre Para El Material Alquimico!.");
            return;
        }

        if(!materialdescription) {
            ShowErrorMaterialForm("Ingreso De La Descripcion Del Material.", "Debes Colocar Una Descripcion Para El Material!.");
            return;
        }

        if(!materialquantity || materialquantity < 0) {
            ShowErrorMaterialForm("Ingreso De Cantidad De Material", "Debes Colocar Una Cantidad De Material Alquimico!.");
            return;
        }

        if(!materialrarity) {
            ShowErrorMaterialForm("Ingreso De Rareza De Material", "Debes Colocar Una Rareza Para El Material Alquimico.");
            return;
        }

        try {
            const MaterialCreateResponse = await fetch(`${API_URL}/alchemicalmaterial`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    Alchemist_ID:          alchemistid,
                    Material_Name:         materialname,
                    Material_Description:  materialdescription,
                    Material_Quantity:     materialquantity,
                    Material_Rarity:       materialrarity,
                })
        });
        if (!MaterialCreateResponse.ok) {
            ShowErrorMaterialForm("Error De Peticion.", "No Se Pudo Realizar La Peticion Al Servidor.");
        }
        else {
            ShowSuccessMaterialForm("Ingreso De Material.","El Material Alquimico Ha Sido Ingresado Con Exito!.");
        }
        } catch(error) {
            ShowErrorMaterialForm("Error.", "Problemas Con El Envio De Datos.");
        }
    };

    const HandleIDException = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetID = Number(e.target.value);
        setAlchemistid(TargetID);
    };

    const HandleNameException = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetName = e.target.value;
        setMaterialname(TargetName);
    };

    const HandleDescriptionException = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetDescription = e.target.value;
        setMaterialdescription(TargetDescription);
    };

    const HandleQuantityException = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetQuantity = Number(e.target.value);
        setMaterialquantity(TargetQuantity);
    };

    const HandleRarityException = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetRarity = e.target.value;
        setMaterialrarity(TargetRarity);
    };

    return (
        <form onSubmit={HandleExceptionMaterialNoID} className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-xl shadow-2xl p-8 space-y-6">
        
        <h3 className="text-3xl font-extrabold text-center text-slate-800">
            Ingreso De Material Alquimico
        </h3>

        <div className="flex flex-col space-y-3">
            <label htmlFor="alchemistid" className="font-bold text-red-800 text-center">
                Ingresa El ID Del Alquimista A Asignar El Material Alquimico
            </label>

            <input onChange = {HandleIDException} type="number" id="alchemistid" placeholder="Ej: 1, 2, 3, 4, 5..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div className="flex flex-col space-y-3">
            <label htmlFor="materialname" className="font-bold text-red-800 text-center">
                ¿Cual Es El Nombre Del Material?
            </label>

            <input onChange = {HandleNameException} type="text" id="materialname" placeholder="Ej: Oro..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div className="flex flex-col space-y-3">
            <label htmlFor="materialdescription" className="font-bold text-red-800 text-center">
                Coloca Una Descripcion Para Este Material
            </label>

            <input onChange = {HandleDescriptionException} type="text" id="materialdescription" placeholder="Ej: Radioactividad Alta..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div className="flex flex-col space-y-3">
            <label htmlFor="materialquantity" className="font-bold text-red-800 text-center">
                ¿Que Cantidad De Material Vas A Ingresar Al Inventario?
            </label>

            <input onChange = {HandleQuantityException} type="number" id="materialquantity" placeholder="Ej: 12, 45, 67..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div className="flex flex-col space-y-3">
            <label htmlFor="materialrarity" className="font-bold text-red-800 text-center">
                ¿De Que Rareza Es El Material?
            </label>

            <input onChange = {HandleRarityException} type="text" id="materialrarity" placeholder="Ej: Legendaria..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div>
            <button type="submit" className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md cursor-pointer transition-transform duration-200 shadow-md hover:scale-[1.02]">
                Ingresar El Material Alquimico
            </button>
        </div>
    </form>
    );
}

function AlchemicalMaterialModifyForm() {

    const [alchemistid, setAlchemistid] = useState<number>(0);
    const [materialname, setMaterialname] = useState<string>("");
    const [materialdescription, setMaterialdescription] = useState<string>("");
    const [materialquantity, setMaterialquantity] = useState<number>(0);
    const [materialrarity, setMaterialrarity] = useState<string>("");

    const HandleExceptionMaterialID = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!alchemistid || alchemistid <= 0) {
            ShowErrorMaterialForm("Ingreso Del Numero Del Alquimista.", "Debes Colocar El Numero Del Alquimista A Modificar El Material!.");
            return;
        }

        if(!materialname) {
            ShowErrorMaterialForm("Ingreso Del Nombre Del Material.", "Debes Colocar Un Nombre Para La Modificacion Del Material!.");
            return;
        }

        if(!materialdescription) {
            ShowErrorMaterialForm("Ingreso De Descripcion.", "Debes Colocar Una Descripcion Para La Modificacion Del Material!.");
            return;
        }

        if(!materialquantity || materialquantity < 0) {
            ShowErrorMaterialForm("Ingreso De Cantidad De Material.", "Debes Colocar Una Cantidad De Material Valida!.");
            return;
        }

        if(!materialrarity) {
            ShowErrorMaterialForm("Ingreso De Rareza De Material.", "Debes Colocar Una Rareza De Material!.");
            return;
        }

        try {
            const MaterialModifyResponse = await fetch(`${API_URL}/alchemicalmaterial/${alchemistid}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    Alchemist_ID:           alchemistid,
                    Material_Name:          materialname,
                    Material_Description:   materialdescription,
                    Material_Quantity:      materialquantity,
                    Material_Rarity:        materialrarity,
                })
        });
        if(!MaterialModifyResponse.ok) {
            ShowErrorMaterialForm("Error De Peticion.", "No Se Pudo Realizar La Peticion Al Servidor.");
        }
        else {
            ShowSuccessMaterialForm("Modificacion / Eliminacion De Material.","El Material Ha Sido Modificado O Eliminado Con Exito!.");
        }
        } catch(error) {
            ShowErrorMaterialForm("Error.", "Problemas Con El Envio De Datos.");
        }
    };

    const HandleIDException = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetID = Number(e.target.value);
        setAlchemistid(TargetID);
    };

    const HandleNameException = (e: React.ChangeEvent<HTMLInputElement>) => {
    const TargetName = e.target.value;
        setMaterialname(TargetName);
    };

    const HandleDescriptionException = (e: React.ChangeEvent<HTMLInputElement>) => {
    const TargetDescription = e.target.value;
        setMaterialdescription(TargetDescription);
    };

    const HandleQuantityException = (e: React.ChangeEvent<HTMLInputElement>) => {
    const TargetQuantity = Number(e.target.value);
        setMaterialquantity(TargetQuantity);
    };

    const HandleRarityException = (e: React.ChangeEvent<HTMLInputElement>) => {
    const TargetRarity = e.target.value;
        setMaterialrarity(TargetRarity);
    };

    return (
        <form onSubmit={HandleExceptionMaterialID} className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-xl shadow-2xl p-8 space-y-6">
        
        <h3 className="text-3xl font-extrabold text-center text-slate-800">
            Modificacion De Material Alquimico
        </h3>

        <div className="flex flex-col space-y-3">
            <label htmlFor="alchemistmodid" className="font-bold text-red-800 text-center">
                Ingresa El ID Del Material A Modificar
            </label>

            <input onChange = {HandleIDException} type="number" id="alchemistmodid" placeholder="Ej: 1, 2, 3, 4, 5..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div className="flex flex-col space-y-3">
            <label htmlFor="materialmodname" className="font-bold text-red-800 text-center">
                Ingresa Un Nuevo Nombre Para El Material
            </label>

            <input onChange = {HandleNameException} type="text" id="materialmodname" placeholder="Ej: Agua..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div className="flex flex-col space-y-3">
            <label htmlFor="materialmoddescription" className="font-bold text-red-800 text-center">
                Ingresa Una Nueva Descripcion Para El Material
            </label>

            <input onChange = {HandleDescriptionException} type="text" id="materialmoddescription" placeholder="Ej: Alto Riesgo De Uso..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div className="flex flex-col space-y-3">
            <label htmlFor="materialmodquantity" className="font-bold text-red-800 text-center">
                Inserta Una Nueva Cantidad Para El Material Alquimico
            </label>

            <input onChange = {HandleQuantityException} type="number" id="materialmodquantity" placeholder="Ej: 15, 23, 45..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div className="flex flex-col space-y-3">
            <label htmlFor="materialmodrarity" className="font-bold text-red-800 text-center">
                Inserta Una Nueva Rareza Del Material Alquimico
            </label>

            <input onChange = {HandleRarityException} type="text" id="materialmodrarity" placeholder="Ej: Comun..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div>
            <button type="submit" className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md cursor-pointer transition-transform duration-200 shadow-md hover:scale-[1.02]">
                Modificar El Material Alquimico
            </button>
        </div>
    </form>
    );
}

function AlchemicalMaterialDeleteForm() {

    const [materialid, setMaterialid] = useState<number>(0);

    const HandleExceptionMaterialID = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!materialid || materialid <= 0) {
            ShowErrorMaterialForm("Ingreso Del Numero De Material.", "Debes Colocar El Numero De Material A Eliminar!.");
            return;
        }
        try {
            const MaterialDeleteResponse = await fetch(`${API_URL}/alchemicalmaterial/${materialid}`, {
                method: "DELETE",
            });
        if(!MaterialDeleteResponse.ok) {
            ShowErrorMaterialForm("Error De Peticion.", "No Se Pudo Realizar La Peticion Al Servidor.");
        }
        else {
            ShowSuccessMaterialForm("Modificacion / Eliminacion De Material.","El Material Alquimico Ha Sido Modificado O Eliminado Con Exito!.");
        }
        } catch (error) {
            ShowErrorMaterialForm("Error.", "Problemas Con El Envio De Datos.");
        }
    };

    const HandleIDException = (e: React.ChangeEvent<HTMLInputElement>) => {
        const TargetID = Number(e.target.value);
        setMaterialid(TargetID);
    };

    return (
        <form onSubmit={HandleExceptionMaterialID} className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-xl shadow-2xl p-8 space-y-6">
        
        <h3 className="text-3xl font-extrabold text-center text-slate-800">
            Eliminacion De Material Alquimico
        </h3>

        <div className="flex flex-col space-y-3">
            <label htmlFor="materialdelid" className="font-bold text-red-800 text-center">
                Ingresa El ID Del Material A Eliminar
            </label>

            <input onChange = {HandleIDException} type="number" id="materialdelid" placeholder="Ej: 1, 2, 3, 4, 5..." className="w-full px-4 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-medium placeholder-gray-400"/>
        </div>

        <div>
            <button type="submit" className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md cursor-pointer transition-transform duration-200 shadow-md hover:scale-[1.02]">
                Eliminar El Material Alquimico
            </button>
        </div>
    </form>
    );
}

function AlchemicalMaterialQueryForm() {
    
    const [materials, setMaterials] = useState<ResponseAlchemical_Material[] | null>(null);
    const [showMaterials, setShowMaterials] = useState<boolean>(false);

    const AlchemicalMaterialQueryHandler = async () => {
        setShowMaterials(false);
        try {
            const MaterialQueryResponse = await fetch(`${API_URL}/alchemicalmaterial`, {
                method: "GET"});
            if (!MaterialQueryResponse.ok) {
                ShowErrorMaterialForm("Error De Petición", "No Se Pudo Realizar La Petición Al Servidor.");
                setMaterials([]);
                return;
            }
            const Materials: ResponseAlchemical_Material[] = await MaterialQueryResponse.json();
            setMaterials(Materials);
            ShowSuccessMaterialForm("Consulta De Materiales Alquimicos", "Los Materiales Alquimicos Se Han Consultado Correctamente.");
        } catch (error) {
            ShowErrorMaterialForm("Error", "Problemas Con La Conexion Al Servidor.");
            setMaterials([]);
        } finally {
            setShowMaterials(true);
        }
    };

    return (
        <div className = "w-full max-w-4xl bg-white/40 backdrop-blur-md rounded-xl shadow-lg p-5 min-h-[400px]">
            <button onClick={AlchemicalMaterialQueryHandler} className="w-full justify-items-center py-2 bg-slate-400 hover:bg-slate-500 text-black font-bold rounded-md shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer">
                !Realiza Tu Consulta Aqui De Materiales Alquimicos!
            </button>

            {showMaterials && materials && materials.length > 0 && (
                <div className="mt-4 space-y-4"> {materials.map((material) => (
                    <div key={material.Material_ID} className="p-4 bg-white/50 backdrop-blur-md rounded-lg shadow-md">
                        <h3 className="text-3xl text-center text-red-800 font-bold">{material.Material_Name}</h3>
                            <p className="text-xl text-justify text-black font-bold">Descripcion Del Material Alquimico: {material.Material_Description}</p>
                            <p className="text-xl text-justify text-black font-bold">Cantidad De Material En Inventario: {material.Material_Quantity}</p>
                            <p className="text-xl text-justify text-black font-bold">Rareza Del Material Alquimico: {material.Material_Rarity}</p>
                            <p className="text-xl text-justify text-black font-bold">Fecha De Coleccion Del Material Alquimico: {material.Material_Collected_At}</p>
                            <p className="text-xl text-justify text-black font-bold">Alquimista Relacionado Con El Material Alquimico: {material.Alchemist.Alchemist_Name}</p>
                            <p className="text-xl text-justify text-black font-bold">ID Del Alquimista Relacionado Con El Material Alquimico: {material.Alchemist.Alchemist_ID}</p>
                        </div>
                    ))}
                </div>
            )}

            {showMaterials && materials?.length === 0 && (
                <div className="text-2xl text-center text-black font-bold pt-5 pb-5">
                    No Hay Materiales Alquimicos Disponibles En El Momento
                </div>
            )}
        </div>
    );
}

export { AlchemicalMaterialRecordForm, AlchemicalMaterialModifyForm, AlchemicalMaterialDeleteForm, AlchemicalMaterialQueryForm };
