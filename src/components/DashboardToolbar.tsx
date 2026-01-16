import { FaPlus, FaTimes, FaFilter } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface DashboardToolbarProps {
  isFormOpen: boolean;
  onToggleForm: () => void;
}

export const DashboardToolbar = ({ isFormOpen, onToggleForm }: DashboardToolbarProps) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 border-4 border-black bg-theme-bg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
      {/* Left Actions: Toggle Form */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleForm}
          className={cn(
            "flex items-center gap-2 px-6 py-3 font-black uppercase text-sm border-2 border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5",
            isFormOpen
              ? "bg-action-delete text-white hover:brightness-110"
              : "bg-action-create text-white hover:brightness-110"
          )}
        >
          {isFormOpen ? <FaTimes size={16} /> : <FaPlus size={16} />}
          {isFormOpen ? "Cerrar Formulario" : "Nuevo Registro"}
        </button>
      </div>

      {/* Right Actions: Filters Placeholders */}
      <div className="flex items-center gap-2">
        {/* Placeholder for future filters */}
        <div className="items-center gap-2 px-4 py-2 border-2 border-black bg-white/50 opacity-60 cursor-not-allowed hidden md:flex">
          <FaFilter className="text-secondary" />
          <span className="text-secondary font-bold text-xs uppercase">Filtros (Próximamente)</span>
        </div>
      </div>
    </div>
  );
};
