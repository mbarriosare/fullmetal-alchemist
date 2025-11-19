
import { useState } from "react";
import { AlchemistDeleteForm, AlchemistQueryForm, CreateAlchemistForm, ModifyAlchemistForm } from "./AlchemistFormsComponent";

function AlchemistFunctions() {

    const AlchemistForms = {
        CREATE:     <CreateAlchemistForm onClose={() => setActiveForm(null)} />,
        MODIFY:     <ModifyAlchemistForm />,
        DELETE:     <AlchemistDeleteForm />,
        RETRIEVE:   <AlchemistQueryForm />,
    };

    const [activeform, setActiveForm] = useState<keyof typeof AlchemistForms | null>(null);
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-slate-200 to-slate-800 px-6 py-10 space-y-10">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-4 gap-6">
        
            <div className="w-full h-full flex flex-col bg-linear-to-br from-rose-500 to-rose-950 rounded-xl shadow-lg p-6 space-y-6">
                <button onClick={() => {setActiveForm("CREATE")}} className="font-bold text-center text-2xl text-slate-300 cursor-pointer">
                    Registrar Alquimistas.
                </button>
            </div>

            <div className="w-full h-full flex flex-col bg-linear-to-br from-rose-500 to-rose-950 rounded-xl shadow-lg p-6 space-y-6">
                <button onClick={() => {setActiveForm("MODIFY")}} className="font-bold text-center text-2xl text-slate-300 cursor-pointer">
                    Modificar Alquimistas.
                </button>
            </div>

            <div className="w-full h-full flex flex-col bg-linear-to-br from-rose-500 to-rose-950 rounded-xl shadow-lg p-6 space-y-6">
                <button onClick={() => {setActiveForm("DELETE")}} className="font-bold text-center text-2xl text-slate-300 cursor-pointer">
                    Eliminar Alquimistas.
                </button>
            </div>

            <div className="w-full h-full flex flex-col bg-linear-to-br from-rose-500 to-rose-950 rounded-xl shadow-lg p-6 space-y-6">
                <button onClick={() => {setActiveForm("RETRIEVE")}} className="font-bold text-center text-2xl text-slate-300 cursor-pointer">
                    Consultar Alquimistas.
                </button>
            </div>
        </div>
        <div className="w-full max-w-4xl justify-items-center bg-white/40 backdrop-blur-md rounded-xl shadow-lg pt-5 pb-5">
            <div className="justify-items-center bg-linear-to-br from-slate-400 to-slate-600 rounded-xl shadow-lg p-6 space-y-6">
                <h1 className="text-2xl text-center text-black font-bold pt-5 pb-5">
                    Panel Para La Manipulacion De Los Datos De Los Alquimistas
                </h1>
                {activeform && AlchemistForms[activeform]}
            </div>
        </div>
    </div> 
    );
}

export { AlchemistFunctions }
