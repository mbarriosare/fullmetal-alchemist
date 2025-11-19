
import { useState } from "react";
import { MissionCreateForm, MissionModifyForm, MissionDeleteForm, MissionQueryForm, } from "./MissionFormsComponent";
import { AlchemicalMaterialRecordForm, AlchemicalMaterialModifyForm, AlchemicalMaterialDeleteForm, AlchemicalMaterialQueryForm } from "./AlchemicalMaterialFormsComponent";
import { TransmutationDeleteForm, TransmutationQueryForm, TransmutationRecordForm } from "./TransmutationFormsComponent";
import { useAuth } from "../jwt/AuthProviderJWT";

function DashBoardComponent() {

    const {role} = useAuth();
    
    const MissionForms = {
        CREATE:     <MissionCreateForm />,
        MODIFY:     <MissionModifyForm />,
        DELETE:     <MissionDeleteForm />,
        RETRIEVE:   <MissionQueryForm />,
    };

    const AlchemicalMaterialForms = {
        CREATE:     <AlchemicalMaterialRecordForm />,
        MODIFY:     <AlchemicalMaterialModifyForm />,
        DELETE:     <AlchemicalMaterialDeleteForm />,
        RETRIEVE:   <AlchemicalMaterialQueryForm />,
    };

    const TransmutationForms = {
        CREATE:     <TransmutationRecordForm />,
        DELETE:     <TransmutationDeleteForm />,
        RETRIEVE:   <TransmutationQueryForm />,
    }

    const AllowedActions = {
        MISSION:        ["CREATE", "MODIFY", "DELETE", "RETRIEVE"],
        MATERIAL:       ["CREATE", "MODIFY", "DELETE", "RETRIEVE"],
        TRANSMUTATION:  ["CREATE", "DELETE", "RETRIEVE"],
    } as const;

    type Sections = "MISSION" | "MATERIAL" | "TRANSMUTATION" | null;
    type Actions = keyof typeof MissionForms | keyof typeof AlchemicalMaterialForms | keyof typeof TransmutationForms | null;

    const [activeForm, setActiveForm] = useState<{ Section: Sections; Action: Actions }>({
        Section: null,
        Action: null
    });

    const changeFormAct = (Section: Sections, Action: Actions) => {

    if (!Section || !Action) {
        setActiveForm({ Section: null, Action: null });
        return;
    }

    const Validation = AllowedActions[Section]?.includes(Action as any);

    if (Validation) {
        setActiveForm({ Section, Action });
    } else {
        console.warn(`Action "${Action}" Is Not Valid For This: "${Section}"`);
    }
    };

    return(
        <div className="min-h-screen bg-linear-to-br items-center from-slate-200 to-slate-800 px-4 pt-6 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                <div className="flex flex-col space-y-6">
                    <div className="w-full h-full flex flex-col bg-linear-to-br from-rose-500 to-rose-950 rounded-xl shadow-lg p-6 space-y-6">
                        <h3 className="font-bold text-center text-2xl text-slate-300">Misiones.</h3>
                        {role === "Alchemist" && (
                        <button onClick={() => changeFormAct("MISSION", "CREATE")} className="mt-auto py-2 bg-slate-400 hover:bg-slate-500 text-black font-bold rounded-md shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer">
                            Crear Nueva Mision.
                        </button>
                        )}
                        {role === "Alchemist" && (
                        <button onClick={() => changeFormAct("MISSION", "MODIFY")} className="mt-auto py-2 bg-slate-400 hover:bg-slate-500 text-black font-bold rounded-md shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer">
                            Modificar Una Mision.
                        </button>
                        )}
                        {role === "Supervisor" && ( 
                        <button onClick={() => changeFormAct("MISSION", "DELETE")} className="mt-auto py-2 bg-slate-400 hover:bg-slate-500 text-black font-bold rounded-md shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer">
                            Eliminar Una Mision.
                        </button>
                        )}
                        {role === "Supervisor" && (
                        <button onClick={() => changeFormAct("MISSION", "RETRIEVE")} className="mt-auto py-2 bg-slate-400 hover:bg-slate-500 text-black font-bold rounded-md shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer">
                            Consultar Misiones.
                        </button>
                        )}
                    </div>
                </div>
                <div className="flex flex-col space-y-6">
                    <div className="w-full h-full flex flex-col bg-linear-to-br from-rose-500 to-rose-950 rounded-xl shadow-lg p-6 space-y-6">
                        <h3 className="font-bold text-center text-2xl text-slate-300">Transmutaciones.</h3>
                        <div className="flex flex-col items-center space-y-4 mt-auto mb-auto">
                            {role === "Alchemist" && (
                            <button onClick={() => changeFormAct("TRANSMUTATION", "CREATE")} className="w-full py-2 bg-slate-400 hover:bg-slate-500 text-black font-bold rounded-md shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer">
                                Solicitar Nueva Transmutacion.
                            </button>
                            )}
                            {role === "Supervisor" && (
                            <button onClick={() => changeFormAct("TRANSMUTATION", "DELETE")} className="w-full py-2 bg-slate-400 hover:bg-slate-500 text-black font-bold rounded-md shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer">
                                Eliminar Transmutacion.
                            </button>
                            )}
                            {role === "Supervisor" && (
                            <button onClick={() => changeFormAct("TRANSMUTATION", "RETRIEVE")} className="w-full py-2 bg-slate-400 hover:bg-slate-500 text-black font-bold rounded-md shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer">
                                Consultar Transmutaciones.
                            </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-6">
                    <div className="w-full h-full flex flex-col bg-linear-to-br from-rose-500 to-rose-950 rounded-xl shadow-lg p-6 space-y-6">
                        <h3 className="font-bold text-center text-2xl text-slate-300">Materiales Alquimicos.</h3>
                        {role === "Alchemist" && (
                        <button onClick={() => changeFormAct("MATERIAL", "CREATE")} className="mt-auto py-2 bg-slate-400 hover:bg-slate-500 text-black font-bold rounded-md shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer">
                            Ingresar Material Alquimico.
                        </button>
                        )}
                        {role === "Alchemist" && (
                        <button onClick={() => changeFormAct("MATERIAL", "MODIFY")} className="mt-auto py-2 bg-slate-400 hover:bg-slate-500 text-black font-bold rounded-md shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer">
                            Modificar Material Alquimico.
                        </button>
                        )}
                        {role === "Supervisor" && (
                        <button onClick={() => changeFormAct("MATERIAL", "DELETE")} className="mt-auto py-2 bg-slate-400 hover:bg-slate-500 text-black font-bold rounded-md shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer">
                            Eliminar Material Alquimico.
                        </button>
                        )}
                        {role === "Supervisor" && (
                        <button onClick={() => changeFormAct("MATERIAL", "RETRIEVE")} className="mt-auto py-2 bg-slate-400 hover:bg-slate-500 text-black font-bold rounded-md shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer">
                            Consultar Materiales Alquimicos.
                        </button>
                        )}
                    </div>
                </div>
            </div>
                <div className="flex justify-center w-auto pt-10 pb-10">
                    <div className="w-full max-w-4xl justify-items-center bg-white/40 backdrop-blur-md rounded-xl shadow-lg pt-5 pb-5">
                        <div className="justify-items-center bg-linear-to-br from-slate-400 to-slate-600 rounded-xl shadow-lg p-6 space-y-6">
                            <h1 className="text-2xl text-center text-black font-bold pt-5 pb-5">
                                DashBoard Para La Visualizacion De La Informacion Requerida.
                            </h1>
                            {activeForm.Section === "MISSION" && activeForm.Action && MissionForms[activeForm.Action as keyof typeof MissionForms]}
                            {activeForm.Section === "MATERIAL" && activeForm.Action && AlchemicalMaterialForms[activeForm.Action as keyof typeof AlchemicalMaterialForms]}
                            {activeForm.Section === "TRANSMUTATION" && activeForm.Action && TransmutationForms[activeForm.Action as keyof typeof TransmutationForms]}
                        </div>
                    </div>
                </div>
            </div>
    );
}

export { DashBoardComponent };
