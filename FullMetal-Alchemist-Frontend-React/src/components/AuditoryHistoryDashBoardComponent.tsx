
import { useState } from "react";
import { AuditoryDeleteForm, AuditoryQueryForm } from "./AuditoryFormsComponent";

function AuditoryDashboard() {

  const [activeForm, setActiveForm] = useState<"DELETE" | "RETRIEVE" | null>(null);

  const AuditoryForms = {
    DELETE: <AuditoryDeleteForm />,
    RETRIEVE: <AuditoryQueryForm />,
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-200 to-slate-800 justify_center flex flex-col items-center px-4 pt-10 space-y-10">
      <div className="w-full max-w-2xl flex flex-col md:flex-row gap-6 justify-center">
        <div className="w-full h-full flex flex-col bg-linear-to-br from-rose-500 to-rose-950 rounded-xl shadow-lg p-6 space-y-6">
          <h3 className="text-2xl font-bold text-center text-slate-300">Auditorias.</h3>
          <button onClick={() => setActiveForm("RETRIEVE")} className="mt-auto py-2 bg-slate-400 hover:bg-slate-500 text-black font-bold rounded-md shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer">
            Consultar Auditorias.
          </button>
          <button onClick={() => setActiveForm("DELETE")} className="mt-auto py-2 bg-slate-400 hover:bg-slate-500 text-black font-bold rounded-md shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer">
            Eliminar Auditoria.
          </button>
        </div>
      </div>

      {activeForm && (
        <div className="flex justify-center w-full">
          <div className="w-full max-w-4xl bg-white/40 backdrop-blur-md rounded-xl shadow-lg p-6">
            <div className="bg-linear-to-br from-slate-400 to-slate-600 rounded-xl shadow-lg p-6 space-y-6">
              <h1 className="text-2xl text-center text-black font-bold pt-2 pb-2">
                DashBoard Para La Visualizacion De Auditorias.
              </h1>
                <div className="w-full flex flex-col items-center">
                  {AuditoryForms[activeForm]}
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { AuditoryDashboard };
