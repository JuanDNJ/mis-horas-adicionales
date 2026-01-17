import Header from "@/components/Header";
import Main from "@/components/Main";
import { useState, useEffect, type ChangeEvent } from "react";
import { HoursForm, type HoursData } from "@/components/HoursForm";
import { HoursTable } from "@/components/HoursTable";
import { DashboardToolbar } from "@/components/DashboardToolbar";
import { FaPlus, FaTimes } from "react-icons/fa";
import { calculateDuration, cn } from "@/lib/utils";
import { useUserProfile } from "@/hooks/useUserProfile";
import { auth } from "@/lib/firebase";
import {
  createHoursRecord,
  updateHoursRecord,
  deleteHoursRecord,
  getUserHoursRecords,
  type HoursRecord,
} from "@/lib/hoursService";

const Dashboard = () => {
  const { userProfile } = useUserProfile();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Determinar si el perfil está completo
  const isProfileIncomplete =
    !userProfile || !userProfile.jobTitle || !userProfile.sector || !userProfile.employeeId;

  const [horas, setHoras] = useState<HoursRecord[]>([]);
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

  // Cargar registros desde Firestore al montar el componente
  useEffect(() => {
    const loadHoursRecords = async () => {
      if (!auth.currentUser) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const records = await getUserHoursRecords(auth.currentUser.uid);
        setHoras(records);
        setError(null);
      } catch (err) {
        console.error("Error al cargar registros:", err);
        setError("No se pudieron cargar los registros de horas");
      } finally {
        setIsLoading(false);
      }
    };

    loadHoursRecords();
  }, []);

  const handleHoursChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMisHoras((prev: HoursData) => {
      const newData = { ...prev, [name]: value };
      if (name === "hora_entrada" || name === "hora_salida") {
        if (newData.hora_entrada && newData.hora_salida) {
          newData.total_horas = calculateDuration(newData.hora_entrada, newData.hora_salida);
        }
      }
      return newData;
    });
  };

  const handleAddHour = async () => {
    // Basic validation
    if (!misHoras.empresa || !misHoras.dia || !misHoras.hora_entrada) {
      alert("Por favor completa los campos obligatorios");
      return;
    }

    if (!auth.currentUser) {
      alert("Debes estar autenticado para guardar registros");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      if (editingIndex !== null) {
        // Actualizar registro existente
        const recordToUpdate = horas[editingIndex];
        if (recordToUpdate.id) {
          await updateHoursRecord(recordToUpdate.id, misHoras);
          const updatedRecords = await getUserHoursRecords(auth.currentUser.uid);
          setHoras(updatedRecords);
        }
        setEditingIndex(null);
      } else {
        // Crear nuevo registro
        await createHoursRecord(auth.currentUser.uid, misHoras);
        const updatedRecords = await getUserHoursRecords(auth.currentUser.uid);
        setHoras(updatedRecords);
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
      });
      setIsFormOpen(false);
    } catch (err) {
      console.error("Error al guardar registro:", err);
      setError("No se pudo guardar el registro. Inténtalo de nuevo.");
      alert("No se pudo guardar el registro. Inténtalo de nuevo.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditHour = (index: number) => {
    setMisHoras(horas[index]);
    setEditingIndex(index);
    setIsFormOpen(true);
  };

  const handleDeleteHour = async (index: number) => {
    const recordToDelete = horas[index];

    if (!recordToDelete.id) {
      // Si no tiene ID, solo lo removemos localmente (no debería pasar)
      setHoras(horas.filter((_, i) => i !== index));
      return;
    }

    if (!confirm("¿Estás seguro de que quieres eliminar este registro?")) {
      return;
    }

    try {
      setError(null);
      await deleteHoursRecord(recordToDelete.id);
      setHoras(horas.filter((_, i) => i !== index));

      if (editingIndex === index) {
        setEditingIndex(null);
        setIsFormOpen(false);
      }
    } catch (err) {
      console.error("Error al eliminar registro:", err);
      setError("No se pudo eliminar el registro. Inténtalo de nuevo.");
      alert("No se pudo eliminar el registro. Inténtalo de nuevo.");
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
          <DashboardToolbar
            isFormOpen={isFormOpen}
            onToggleForm={handleToggleForm}
            isAddDisabled={isProfileIncomplete}
          />

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
                    disabled={isSaving}
                    className={cn(
                      "mt-8 group flex items-center gap-3 bg-action-create text-white border-4 border-black font-black uppercase tracking-widest text-xl py-4 px-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer w-full justify-center xl:w-auto xl:mt-8",
                      isSaving && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <FaPlus
                      className={cn(
                        "transition-transform duration-300",
                        editingIndex !== null ? "" : "group-hover:rotate-90"
                      )}
                    />
                    {isSaving ? "Guardando..." : editingIndex !== null ? "Actualizar" : "Registrar"}
                  </button>

                  {/* Spacer for mobile scroll */}
                  <div className="h-8 xl:hidden"></div>
                </div>
              </div>
            )}

            {/* Table Column - Auto Expand */}
            <div className="w-full xl:flex-1 h-full animate-in fade-in duration-500">
              {error && (
                <div className="mb-4 p-4 bg-red-100 border-2 border-red-500 text-red-700 font-bold">
                  {error}
                </div>
              )}
              {isLoading ? (
                <div className="flex items-center justify-center p-8">
                  <div className="text-theme-color font-bold text-xl">Cargando registros...</div>
                </div>
              ) : (
                <HoursTable data={horas} onDelete={handleDeleteHour} onEdit={handleEditHour} />
              )}
            </div>
          </div>
        </div>
      </Main>
    </>
  );
};
export default Dashboard;
