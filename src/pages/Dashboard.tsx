import Header from "@/components/Header";
import Main from "@/components/Main";
import { useState, useEffect, type ChangeEvent } from "react";
import { HoursForm, type HoursData } from "@/components/HoursForm";
import { HoursTable } from "@/components/HoursTable";
import { DashboardToolbar } from "@/components/DashboardToolbar";
import { FaPlus, FaTimes } from "react-icons/fa";
import { calculateDuration, cn } from "@/lib/utils";

const Dashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [horas, setHoras] = useState<HoursData[]>(() => {
    const saved = localStorage.getItem("horas-data");
    return saved ? JSON.parse(saved) : [];
  });
  const [misHoras, setMisHoras] = useState<HoursData>({
    empresa: "",
    numero_empleado: "",
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    telefono: "",
    dia: "",
    mes: "",
    anio: "",
    hora_entrada: "",
    hora_salida: "",
    origen: "",
    destino: "",
    total_horas: "",
  });

  // Persist horas to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("horas-data", JSON.stringify(horas));
  }, [horas]);

  const handleHoursChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMisHoras((prev) => {
      const newData = { ...prev, [name]: value };
      if (name === "hora_entrada" || name === "hora_salida") {
        if (newData.hora_entrada && newData.hora_salida) {
          newData.total_horas = calculateDuration(newData.hora_entrada, newData.hora_salida);
        }
      }
      return newData;
    });
  };

  const handleAddHour = () => {
    // Basic validation
    if (!misHoras.empresa || !misHoras.dia || !misHoras.hora_entrada) {
      alert("Por favor completa los campos obligatorios");
      return;
    }

    if (editingIndex !== null) {
      const updatedHoras = [...horas];
      updatedHoras[editingIndex] = misHoras;
      setHoras(updatedHoras);
      setEditingIndex(null);
    } else {
      setHoras([...horas, misHoras]);
    }

    // Reset form
    setMisHoras({
      empresa: "",
      numero_empleado: "",
      nombre: "",
      apellido_paterno: "",
      apellido_materno: "",
      telefono: "",
      dia: "",
      mes: "",
      anio: "",
      hora_entrada: "",
      hora_salida: "",
      origen: "",
      destino: "",
      total_horas: "",
      ramo: "",
    });
    setIsFormOpen(false);
  };

  const handleEditHour = (index: number) => {
    setMisHoras(horas[index]);
    setEditingIndex(index);
    setIsFormOpen(true);
  };

  const handleDeleteHour = (index: number) => {
    setHoras(horas.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      setIsFormOpen(false);
    }
  };

  const handleToggleForm = () => {
    if (!isFormOpen) {
      // Opening for new record -> Reset everything
      setMisHoras({
        empresa: "",
        numero_empleado: "",
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        telefono: "",
        dia: "",
        mes: "",
        anio: "",
        hora_entrada: "",
        hora_salida: "",
        origen: "",
        destino: "",
        total_horas: "",
        ramo: "",
      });
      setEditingIndex(null);
      setIsFormOpen(true);
    } else {
      // Closing
      setIsFormOpen(false);
      setEditingIndex(null); // Optional: clear editing state on close
    }
  };

  return (
    <>
      <Header />
      <Main>
        <div className="w-full flex flex-col py-8 px-4">
          <DashboardToolbar isFormOpen={isFormOpen} onToggleForm={handleToggleForm} />

          <div className="flex flex-col xl:flex-row items-start justify-center w-full gap-8">
            {/* Form Column - Conditional Rendering with Modal for Mobile */}
            {isFormOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 xl:static xl:z-auto xl:bg-transparent xl:p-0 xl:backdrop-blur-none xl:flex-col xl:w-auto xl:min-w-112.5 animate-in fade-in duration-200 xl:slide-in-from-left">
                {/* Scrollable Container for Mobile Modal */}
                <div className="w-full max-h-[90vh] overflow-y-auto no-scrollbar xl:overflow-visible xl:max-h-none flex flex-col items-center gap-6 xl:gap-0">
                  {/* Close Button for Mobile Modal */}
                  <div className="w-full flex justify-end xl:hidden sticky top-0 z-10 mb-2">
                    <button
                      onClick={() => setIsFormOpen(false)}
                      className="bg-red-500 text-white p-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-y-0.5 active:shadow-none transition-all"
                    >
                      <FaTimes size={24} />
                    </button>
                  </div>

                  <HoursForm
                    formData={misHoras}
                    onChange={handleHoursChange}
                    setFormData={setMisHoras}
                  />

                  <button
                    onClick={() => {
                      handleAddHour();
                    }}
                    className="mt-8 group flex items-center gap-3 bg-action-create text-white border-4 border-black font-black uppercase tracking-widest text-xl py-4 px-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer w-full justify-center xl:w-auto xl:mt-8"
                  >
                    <FaPlus
                      className={cn(
                        "transition-transform duration-300",
                        editingIndex !== null ? "" : "group-hover:rotate-90"
                      )}
                    />
                    {editingIndex !== null ? "Actualizar" : "Registrar"}
                  </button>

                  {/* Spacer for mobile scroll */}
                  <div className="h-8 xl:hidden"></div>
                </div>
              </div>
            )}

            {/* Table Column - Auto Expand */}
            <div className="w-full xl:flex-1 h-full animate-in fade-in duration-500">
              <HoursTable data={horas} onDelete={handleDeleteHour} onEdit={handleEditHour} />
            </div>
          </div>
        </div>
      </Main>
    </>
  );
};
export default Dashboard;
