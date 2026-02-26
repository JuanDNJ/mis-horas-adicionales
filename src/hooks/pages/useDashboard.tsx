import { useEffect, useState, type ChangeEvent } from "react";
import { useProfileContext } from "../useProfileContext";
import {
  createHoursRecord,
  deleteHoursRecord,
  getUserHoursRecords,
  updateHoursRecord,
  type HoursRecord,
} from "@/lib/hoursService";
import type { HoursData } from "@/components/HoursForm";
import { calculateDuration } from "@/lib/utils";
import { auth } from "@/lib/firebase";

export const useDashboard = () => {
  const { activeJobProfile, jobProfiles, updateJobProfile } = useProfileContext();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Determinar si el perfil está completo
  const isProfileIncomplete = !activeJobProfile;

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

  // Agrupación de horas por Empresa
  const groupedHours = horas.reduce(
    (acc, curr) => {
      // Usar la empresa o "Sin Empresa" como clave
      const key = curr.empresa?.trim() || "GENERAL";
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(curr);
      return acc;
    },
    {} as Record<string, HoursRecord[]>
  );

  // Ordenar claves para renderizado consistente (puede ser alfabético o fixed)
  const sortedCompanies = Object.keys(groupedHours).sort();

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

      if (editingId) {
        // Actualizar registro existente
        await updateHoursRecord(editingId, misHoras);
        const updatedRecords = await getUserHoursRecords(auth.currentUser.uid);
        setHoras(updatedRecords);
        setEditingId(null);
      } else {
        // Crear nuevo registro
        await createHoursRecord(auth.currentUser.uid, misHoras);
        const updatedRecords = await getUserHoursRecords(auth.currentUser.uid);
        setHoras(updatedRecords);
      }

      // Actualizar timestamp del perfil utilizado para que se marque como "Último Activo"
      const usedProfile = jobProfiles.find(
        (p) => p.companyName.trim().toLowerCase() === misHoras.empresa.trim().toLowerCase()
      );

      if (usedProfile) {
        // Al actualizar el perfil (incluso vacío), se actualiza su 'updatedAt' en el servidor
        // Esto hará que suba a la primera posición y se seleccione automáticamente
        await updateJobProfile(usedProfile.id, {});
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

  const handleEditHour = (record: HoursRecord) => {
    if (!record.id) return;
    setMisHoras(record); // Carga los datos en el form
    setEditingId(record.id); // Establece el ID que se está editando
    setIsFormOpen(true);
  };

  const handleDeleteHour = async (record: HoursRecord) => {
    if (!record.id) {
      // Fallback local: buscamos por 'algún' criterio o no hacemos nada si no tiene ID
      const index = horas.indexOf(record);
      if (index > -1) {
        const newHoras = [...horas];
        newHoras.splice(index, 1);
        setHoras(newHoras);
      }
      return;
    }

    if (!confirm("¿Estás seguro de que quieres eliminar este registro?")) {
      return;
    }

    try {
      setError(null);
      await deleteHoursRecord(record.id);
      // Recargar de servidor para asegurar consistencia o filtrar local
      if (auth.currentUser) {
        const updatedRecords = await getUserHoursRecords(auth.currentUser.uid);
        setHoras(updatedRecords);
      }

      if (editingId === record.id) {
        setEditingId(null);
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
      setEditingId(null); // Clear editing state
      setIsFormOpen(true);
    } else {
      // Closing
      setIsFormOpen(false);
      setEditingId(null);
    }
  };
  return {
    isProfileIncomplete,
    activeJobProfile,
    jobProfiles,
    horas,
    groupedHours,
    sortedCompanies,
    isFormOpen,
    misHoras,
    handleHoursChange,
    handleAddHour,
    handleEditHour,
    handleDeleteHour,
    handleToggleForm,
    isLoading,
    isSaving,
    error,
    setIsFormOpen,
    setMisHoras,
    editingId,
    setEditingId,
  };
};

export default useDashboard;
