import {
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/Calendar";
import { Popover } from "@/components/Popover";
import { FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import { es } from "date-fns/locale";

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
  ramo?: string;
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
  <div className={cn("flex flex-col gap-2 p-4 border-2 border-black bg-white/50", className)}>
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b-2 border-black pb-1 mb-2 gap-2">
      <h3 className="text-lg font-black uppercase italic text-theme-color">{label}</h3>
      {headerActions && <div className="flex items-center">{headerActions}</div>}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{children}</div>
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
        "w-full px-3 py-2 bg-theme-bg border-2 border-black text-theme-color focus:outline-none focus:shadow-[4px_4px_0px_0px_var(--theme-accent)] focus:border-theme-accent transition-all duration-200 placeholder:text-secondary/40 font-bold",
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
  <nav className="flex items-center gap-4 bg-white/50 px-3 py-1 rounded-sm border border-black/20">
    <span className="text-xs font-bold uppercase text-secondary mr-2">Sector:</span>
    <label className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
      <input
        type="radio"
        name="sector_type"
        value="general"
        checked={selectedSector === "general"}
        onChange={() => onSectorChange("general")}
        className="accent-theme-color w-4 h-4 cursor-pointer"
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
        className="accent-theme-color w-4 h-4 cursor-pointer"
      />
      <span className="text-sm font-bold text-theme-color select-none">Transporte</span>
    </label>
  </nav>
);

export const HoursForm = ({ formData, onChange, setFormData }: HoursFormProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  // Initialize from formData.ramo/origin if present, otherwise default to general
  const [sector, setSector] = useState<"general" | "transport">(() => {
    return formData.ramo || formData.origen || formData.destino ? "transport" : "general";
  });

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
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 bg-header-bg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
      <div className="text-center mb-8 border-b-4 border-black pb-4">
        <h2 className="text-3xl font-black uppercase text-theme-color drop-shadow-sm">
          Registro de Horas
        </h2>
        <p className="text-secondary font-bold font-mono text-sm mt-2">
          Rellena todos los campos requeridos
        </p>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* Datos Personales */}
        <InputGroup label="Información Personal">
          <Input
            label="Empresa"
            name="empresa"
            value={formData.empresa}
            onChange={onChange}
            placeholder="Nombre de la empresa"
            containerClassName="col-span-1 md:col-span-2 lg:col-span-3"
          />
          <Input
            label="No. Empleado"
            name="numero_empleado"
            value={formData.numero_empleado}
            onChange={onChange}
            placeholder="000000"
          />
          <Input
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={onChange}
            placeholder="Tu nombre"
          />
          <Input
            label="Apellido Paterno"
            name="apellido_paterno"
            value={formData.apellido_paterno}
            onChange={onChange}
            placeholder="Apellido Paterno"
          />
          <Input
            label="Apellido Materno"
            name="apellido_materno"
            value={formData.apellido_materno}
            onChange={onChange}
            placeholder="Apellido Materno"
          />
          <Input
            label="Teléfono"
            name="telefono"
            value={formData.telefono}
            onChange={onChange}
            placeholder="555-555-5555"
            type="tel"
          />
        </InputGroup>

        {/* Fecha */}
        <InputGroup label="Fecha del Registro" className="relative z-10">
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
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
                  <span className={!formData.dia ? "text-secondary/60" : ""}>
                    {formattedDateDisplay}
                  </span>
                  <FaCalendarAlt className="text-secondary" />
                </div>
              }
              content={
                <Calendar
                  mode="single"
                  selected={getSelectedDate()}
                  onSelect={handleDateSelect}
                  initialFocus
                />
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
                label="Ramo"
                name="ramo"
                value={formData.ramo || ""}
                onChange={onChange}
                placeholder="Ej: Transporte de mercancías"
                containerClassName="col-span-1 md:col-span-1 lg:col-span-3"
              />
              <Input
                label="Origen"
                name="origen"
                value={formData.origen}
                onChange={onChange}
                placeholder="Lugar de origen"
                containerClassName="col-span-1 md:col-span-1 lg:col-span-1"
              />
              <Input
                label="Destino"
                name="destino"
                value={formData.destino}
                onChange={onChange}
                placeholder="Lugar de destino"
                containerClassName="col-span-1 md:col-span-1 lg:col-span-2"
              />
            </>
          )}
        </InputGroup>
      </form>
    </div>
  );
};
