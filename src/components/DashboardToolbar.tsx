import { FaPlus, FaTimes, FaFilter, FaLock } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface DashboardToolbarProps {
  isFormOpen: boolean;
  onToggleForm: () => void;
  isAddDisabled?: boolean;
  activeCompanyName?: string;
}

export const DashboardToolbar = ({
  isFormOpen,
  onToggleForm,
  isAddDisabled = false,
  activeCompanyName,
}: DashboardToolbarProps) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 border-4 border-black bg-theme-bg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
      {/* Left Actions: Toggle Form */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <button
            onClick={isAddDisabled ? undefined : onToggleForm}
            disabled={isAddDisabled}
            className={cn(
              "flex items-center gap-2 px-6 py-3 font-black uppercase text-sm border-2 border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5",
              isFormOpen
                ? "bg-action-delete text-white hover:brightness-110"
                : isAddDisabled
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed border-gray-600 shadow-none opacity-80"
                  : "bg-action-create text-white hover:brightness-110"
            )}
            title={isAddDisabled ? "Completa tu perfil para añadir registros" : ""}
          >
            {isAddDisabled ? (
              <FaLock size={16} />
            ) : isFormOpen ? (
              <FaTimes size={16} />
            ) : (
              <FaPlus size={16} />
            )}
            {isFormOpen ? "Cerrar Formulario" : "Nuevo Registro"}
          </button>
        </div>
        {isAddDisabled && (
          <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 border border-red-500 inline-block">
            ⚠ Completa tu perfil primero
          </span>
        )}
      </div>

      {/* Right Actions: Filters Placeholders */}
      <div className="flex items-center gap-2">
        {activeCompanyName && (
          <div className="flex flex-col items-end md:hidden bg-white/50 px-2 py-1 border border-black/20 rounded">
            <span className="text-[10px] uppercase font-bold text-secondary">Empresa:</span>
            <span className="text-xs font-black uppercase text-theme-color">
              {activeCompanyName}
            </span>
          </div>
        )}

        {/* Placeholder for future filters */}
        <div className="items-center gap-2 px-4 py-2 border-2 border-black bg-white/50 opacity-60 cursor-not-allowed hidden md:flex">
          <FaFilter className="text-secondary" />
          <span className="text-secondary font-bold text-xs uppercase">Filtros (Próximamente)</span>
        </div>
      </div>
    </div>
  );
};
