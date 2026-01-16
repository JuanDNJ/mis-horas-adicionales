import Header from "@/components/Header";
import Main from "@/components/Main";
import { useState, ChangeEvent } from "react";
import { HoursForm, type HoursData } from "@/components/HoursForm";
import { HoursTable } from "@/components/HoursTable";
import { FaPlus } from "react-icons/fa";

const Dashboard = () => {
  const [horas, setHoras] = useState<HoursData[]>([]);
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
    firma: "",
  });

  const handleHoursChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMisHoras((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTotalHours = () => {
    // Simple calculation logic could go here if needed,
    // but 'misHoras.total_horas' is editable in form.
  };

  const handleAddHour = () => {
    // Basic validation
    if (!misHoras.empresa || !misHoras.dia || !misHoras.hora_entrada) {
      alert("Por favor completa los campos obligatorios");
      return;
    }
    setHoras([...horas, misHoras]);
    // Reset form (keeping some persistent data if needed? No, full reset for now)
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
      firma: "",
    });
  };

  const handleDeleteHour = (index: number) => {
    setHoras(horas.filter((_, i) => i !== index));
  };

  return (
    <>
      <Header />
      <Main>
        <div className="flex flex-col items-center justify-center w-full min-h-full py-8 px-4">
          <HoursForm formData={misHoras} onChange={handleHoursChange} />

          <button
            onClick={handleAddHour}
            className="mt-8 group flex items-center gap-3 bg-theme-accent text-white border-4 border-black font-black uppercase tracking-widest text-xl py-4 px-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
          >
            <FaPlus className="group-hover:rotate-90 transition-transform duration-300" />
            Registrar Horas
          </button>

          <HoursTable data={horas} onDelete={handleDeleteHour} />
        </div>
      </Main>
    </>
  );
};
export default Dashboard;
