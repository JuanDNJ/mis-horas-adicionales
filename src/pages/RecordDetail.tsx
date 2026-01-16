import { useEffect, useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HoursForm, type HoursData } from "@/components/HoursForm";
import Header from "@/components/Header";
import Main from "@/components/Main";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { calculateDuration } from "@/lib/utils";

const RecordDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState<HoursData | null>(() => {
    const saved = localStorage.getItem("horas-data");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        const index = parseInt(id || "-1", 10);
        if (index >= 0 && index < data.length) {
          return data[index];
        }
      } catch {
        localStorage.removeItem("horas-data");
      }
    }
    return null;
  });

  useEffect(() => {
    const saved = localStorage.getItem("horas-data");
    if (!saved) {
      navigate("/dashboard");
      return;
    }
    try {
      const data = JSON.parse(saved);
      const index = parseInt(id || "-1", 10);
      if (index < 0 || index >= data.length) {
        navigate("/dashboard");
        return;
      }
    } catch {
      localStorage.removeItem("horas-data");
      navigate("/dashboard");
    }
  }, [id, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!record) return;
    const { name, value } = e.target;

    setRecord((prev: HoursData | null) => {
      if (!prev) return null;
      const newData = { ...prev, [name]: value };
      if (name === "hora_entrada" || name === "hora_salida") {
        if (newData.hora_entrada && newData.hora_salida) {
          newData.total_horas = calculateDuration(newData.hora_entrada, newData.hora_salida);
        }
      }
      return newData;
    });
  };

  const handleSave = () => {
    if (!record) return;
    const saved = localStorage.getItem("horas-data");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        const index = parseInt(id || "-1", 10);
        if (index >= 0 && index < data.length) {
          data[index] = record;
          localStorage.setItem("horas-data", JSON.stringify(data));
          navigate("/dashboard");
        }
      } catch {
        localStorage.removeItem("horas-data");
        navigate("/dashboard");
      }
    }
  };

  if (!record) return <div>Cargando...</div>;

  return (
    <>
      <Header />
      <Main>
        <div className="w-full max-w-4xl mx-auto py-8 px-4 space-y-6">
          <div className="flex items-center justify-between border-b-4 border-black pb-4">
            <h1 className="text-3xl font-black uppercase text-theme-color drop-shadow-sm">
              Editar Registro
            </h1>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 font-bold hover:underline"
            >
              <FaArrowLeft /> Volver
            </button>
          </div>

          <div className="bg-theme-bg/80 p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <HoursForm
              formData={record}
              onChange={handleChange}
              setFormData={setRecord as Dispatch<SetStateAction<HoursData>>}
            />

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-theme-accent text-white px-6 py-3 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:brightness-110 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
              >
                <FaSave /> Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </Main>
    </>
  );
};

export default RecordDetail;
