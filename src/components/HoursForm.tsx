import {
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useState,
  useEffect,
} from "react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/Calendar";
import { Popover } from "@/components/Popover";
import { FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useProfileContext } from "@/hooks/useProfileContext";

export interface HoursData {
  empresa: string;
  numero_empleado: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  telefono: string;
  dia: string;
  mes: string;
  anio: string;
  hora_entrada: string;
  hora_salida: string;
  origen: string;
  destino: string;
  total_horas: string;
}

interface HoursFormProps {
  formData: HoursData;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setFormData?: Dispatch<SetStateAction<HoursData>>; // Optional for special setters
}

const InputGroup = ({
  label,
  children,
  className,
  headerActions,
}: {
  label: string;
  children: ReactNode;
  className?: string;
  headerActions?: ReactNode;
}) => (
  <div
    className={cn("flex flex-col gap-3 p-3 sm:p-4 border-2 border-black bg-white/50", className)}
  >
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b-2 border-black pb-2 mb-1 gap-2">
      <h3 className="text-sm sm:text-base md:text-lg font-black uppercase italic text-theme-color">
        {label}
      </h3>
      {headerActions && <div className="flex items-center w-full sm:w-auto">{headerActions}</div>}
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"> {children}</div>
  </div>
);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerClassName?: string;
}

const Input = ({ label, className, containerClassName, ...props }: InputProps) => (
  <div className={cn("flex flex-col gap-1", containerClassName)}>
    <label className="text-xs font-bold text-secondary uppercase tracking-wider ml-1">
      {label}
    </label>
    <input
      className={cn(
        "w-full text-xs px-3 py-2 bg-theme-bg border-2 border-black text-theme-color focus:outline-none focus:shadow-[4px_4px_0px_0px_var(--theme-accent)] focus:border-theme-accent transition-all duration-200 placeholder:text-secondary/40 font-bold",
        className
      )}
      autoComplete="off"
      {...props}
    />
  </div>
);

const SectorNavigation = ({
  selectedSector,
  onSectorChange,
}: {
  selectedSector: "general" | "transport";
  onSectorChange: (sector: "general" | "transport") => void;
}) => (
  <nav className="w-full flex items-center gap-4 bg-white/50 px-3 py-1 rounded-sm border border-black/20">
    <span className="text-xs font-bold uppercase text-secondary mr-2">Sector:</span>
    <div className="flex flex-col sm:flex-row gap-2">
      <label className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
        <input
          type="radio"
          name="sector_type"
          value="general"
          checked={selectedSector === "general"}
          onChange={() => onSectorChange("general")}
          className="text-sm accent-theme-color w-4 h-4 cursor-pointer"
        />
        <span className="text-sm font-bold text-theme-color select-none">General</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
        <input
          type="radio"
          name="sector_type"
          value="transport"
          checked={selectedSector === "transport"}
          onChange={() => onSectorChange("transport")}
          className="text-sm accent-theme-color w-4 h-4 cursor-pointer"
        />
        <span className="text-sm font-bold text-theme-color select-none">Transporte</span>
      </label>
    </div>
  </nav>
);

export const HoursForm = ({ formData, onChange, setFormData }: HoursFormProps) => {
  const { userProfile, activeJobProfile, jobProfiles } = useProfileContext();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Track the job associated with the current form data
  const [selectedJobId, setSelectedJobId] = useState<string | undefined>(activeJobProfile?.id);

  // Update selected job when active profile changes externally, but only if we are starting fresh
  // or if we want to force sync. Ideally, we just init with it.
  useEffect(() => {
    if (activeJobProfile && !formData.empresa) {
      setSelectedJobId(activeJobProfile.id);
    }
  }, [activeJobProfile, formData.empresa]);

  // Find the full job object
  const currentFormJob = jobProfiles.find((j) => j.id === selectedJobId) || activeJobProfile;

  // Calculate sector based on formData and current form Job
  const hasTransportData = formData.origen || formData.destino;
  const calculatedSector: "general" | "transport" = hasTransportData
    ? "transport"
    : currentFormJob?.sector === "Transporte"
      ? "transport"
      : "general";

  const [sector, setSector] = useState<"general" | "transport">(calculatedSector);

  // Update sector only when calculatedSector changes
  useEffect(() => {
    setSector(calculatedSector);
  }, [calculatedSector]);

  // Handle Job Selection from dropdown
  const handleJobSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const newJobId = e.target.value;
    setSelectedJobId(newJobId);

    const job = jobProfiles.find((j) => j.id === newJobId);
    if (job && setFormData) {
      setFormData((prev) => ({
        ...prev,
        empresa: job.companyName,
        numero_empleado: job.employeeId,
      }));
    }
  };

  // Autocomplete form data from user profile AND active job profile on mount
  useEffect(() => {
    if (userProfile && setFormData) {
      setFormData((prev) => {
        // Only autocomplete if main fields are empty (new record)
        if (prev.nombre) {
          return prev;
        }

        const parts = (userProfile.displayName || "").trim().split(/\s+/);
        let nombre = "";
        let apellido_paterno = "";
        let apellido_materno = "";

        if (parts.length > 0) {
          if (parts.length === 1) {
            nombre = parts[0];
          } else if (parts.length === 2) {
            nombre = parts[0];
            apellido_paterno = parts[1];
          } else if (parts.length === 3) {
            nombre = parts[0];
            apellido_paterno = parts[1];
            apellido_materno = parts[2];
          } else {
            // 4 or more parts: Last two are surnames, rest is name
            apellido_materno = parts[parts.length - 1];
            apellido_paterno = parts[parts.length - 2];
            nombre = parts.slice(0, parts.length - 2).join(" ");
          }
        }

        return {
          ...prev,
          numero_empleado: currentFormJob?.employeeId || prev.numero_empleado || "",
          empresa: currentFormJob?.companyName || prev.empresa || "",
          telefono: userProfile.phoneNumber || prev.telefono || "",
          nombre: nombre,
          apellido_paterno: apellido_paterno,
          apellido_materno: apellido_materno,
        };
      });
    }
  }, [userProfile, currentFormJob, setFormData]);

  // Helper to handle date selection from Calendar
  const handleDateSelect = (date: Date | undefined) => {
    if (date && setFormData) {
      setFormData((prev) => ({
        ...prev,
        dia: format(date, "dd"),
        mes: format(date, "MM"),
        anio: format(date, "yyyy"),
      }));
      setIsCalendarOpen(false);
    }
  };

  // Helper to get selected date object from form data
  const getSelectedDate = () => {
    if (formData.dia && formData.mes && formData.anio) {
      return new Date(Number(formData.anio), Number(formData.mes) - 1, Number(formData.dia));
    }
    return undefined;
  };

  const formattedDateDisplay =
    formData.dia && formData.mes && formData.anio
      ? format(
          new Date(Number(formData.anio), Number(formData.mes) - 1, Number(formData.dia)),
          "PPP",
          {
            locale: es,
          }
        )
      : "Selecciona una fecha";

  return (
    <div className="w-full max-w-2xl mx-auto p-3 sm:p-4 md:p-6 bg-header-bg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
      <div className="text-center mb-6 sm:mb-8 border-b-4 border-black pb-4">
        <h2 className="text-2xl sm:text-3xl font-black uppercase text-theme-color drop-shadow-sm">
          Registro de Horas
        </h2>
        <p className="text-secondary font-bold font-mono text-xs sm:text-sm mt-2">
          Rellena todos los campos requeridos
        </p>
      </div>

      <form className="space-y-5 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* Datos Personales */}
        <InputGroup label="Información Personal">
          {jobProfiles.length > 0 ? (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col gap-1">
              <label className="text-xs font-bold text-secondary uppercase tracking-wider ml-1">
                Empresa / Perfil
              </label>
              <div className="relative">
                <select
                  value={selectedJobId || ""}
                  onChange={handleJobSelect}
                  name="empresa"
                  id="empresa"
                  title="Selecciona tu empresa y perfil laboral"
                  className="text-sm w-full px-3 py-2 bg-theme-bg border-2 border-black text-theme-color focus:outline-none focus:shadow-[4px_4px_0px_0px_var(--theme-accent)] focus:border-theme-accent transition-all duration-200 font-bold appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Selecciona una empresa
                  </option>
                  {jobProfiles.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.companyName} {job.isDefault ? "(Principal)" : ""}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                  ▼
                </div>
              </div>
              {/* Hidden input to maintain compatibility if 'empresa' is manually typed in logic elsewhere, though we sync it */}
              <input type="hidden" name="empresa" value={formData.empresa} />
            </div>
          ) : (
            <Input
              label="Empresa"
              name="empresa"
              value={formData.empresa}
              onChange={onChange}
              placeholder="Nombre de la empresa"
              containerClassName="col-span-1 md:col-span-2 lg:col-span-3"
            />
          )}

          <Input
            label="No. Empleado"
            name="numero_empleado"
            value={formData.numero_empleado}
            onChange={onChange}
            placeholder="000000"
            containerClassName="sm:col-span-1"
          />
          <Input
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={onChange}
            placeholder="Tu nombre"
            containerClassName="sm:col-span-1"
          />
          <Input
            label="Apellido Paterno"
            name="apellido_paterno"
            value={formData.apellido_paterno}
            onChange={onChange}
            placeholder="Apellido Paterno"
            containerClassName="sm:col-span-1"
          />
          <Input
            label="Apellido Materno"
            name="apellido_materno"
            value={formData.apellido_materno}
            onChange={onChange}
            placeholder="Apellido Materno"
            containerClassName="sm:col-span-1"
          />
          <Input
            label="Teléfono"
            name="telefono"
            value={formData.telefono}
            onChange={onChange}
            placeholder="555-555-5555"
            type="tel"
            containerClassName="sm:col-span-1"
          />
        </InputGroup>

        {/* Fecha */}
        <InputGroup label="Fecha del Registro" className="relative z-10">
          <div className="col-span-1 sm:col-span-2 lg:col-span-3">
            <label className="text-xs font-bold text-secondary uppercase tracking-wider ml-1 mb-1 block">
              Seleccionar Fecha
            </label>
            <Popover
              isOpen={isCalendarOpen}
              onOpenChange={setIsCalendarOpen}
              trigger={
                <div
                  className={cn(
                    "w-full px-3 py-2 bg-theme-bg border-2 border-black text-theme-color cursor-pointer flex items-center justify-between transition-all duration-200 font-bold hover:bg-theme-secondary/10",
                    isCalendarOpen
                      ? "shadow-[4px_4px_0px_0px_var(--theme-accent)] border-theme-accent"
                      : ""
                  )}
                >
                  <small className={!formData.dia ? "text-sm text-secondary/60" : "text-sm"}>
                    {formattedDateDisplay}
                  </small>
                  <FaCalendarAlt className="text-secondary text-sm" />
                </div>
              }
              content={
                <Calendar mode="single" selected={getSelectedDate()} onSelect={handleDateSelect} />
              }
            />
          </div>
        </InputGroup>

        {/* Detalle del Viaje */}
        <InputGroup
          label="Detalles del Servicio"
          headerActions={<SectorNavigation selectedSector={sector} onSectorChange={setSector} />}
        >
          <Input
            label="Hora Entrada"
            name="hora_entrada"
            value={formData.hora_entrada}
            onChange={onChange}
            type="time"
          />
          <Input
            label="Hora Salida"
            name="hora_salida"
            value={formData.hora_salida}
            onChange={onChange}
            type="time"
          />
          <Input
            label="Total Horas"
            name="total_horas"
            value={formData.total_horas}
            onChange={onChange}
            placeholder="0"
            type="number"
            readOnly
          />

          {sector === "transport" && (
            <>
              <Input
                label="Origen"
                name="origen"
                value={formData.origen}
                onChange={onChange}
                containerClassName="col-span-1 md:col-span-1 lg:col-span-1"
              />
              <Input
                label="Destino"
                name="destino"
                value={formData.destino}
                onChange={onChange}
                containerClassName="col-span-1 md:col-span-1 lg:col-span-2"
              />
            </>
          )}
        </InputGroup>
      </form>
    </div>
  );
};
