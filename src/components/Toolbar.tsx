import type { FC } from "react";
import { FaFilter } from "react-icons/fa";

interface DashboardToolbarProps {
  children: React.ReactNode;
  isAddDisabled?: boolean;
  activeCompanyName?: string;
}

export const Toolbar: FC<DashboardToolbarProps> = ({
  children,
  isAddDisabled = false,
  activeCompanyName,
}) => {
  return (
    <div className="w-full flex items-center md:flex-row md:items-center justify-between gap-4 p-4 border-4 border-black bg-theme-bg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
      {/* Left Actions: Toggle Form */}
      <div className="flex flex-col gap-1">
        {isAddDisabled ? (
          <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 border border-red-500 inline-block">
            ⚠ Completa tu perfil primero
          </span>
        ) : (
          <nav className="flex items-center gap-4">{children}</nav>
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
