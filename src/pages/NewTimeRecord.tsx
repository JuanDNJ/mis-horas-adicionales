import { HoursForm } from "@/components/HoursForm";
import useDashboard from "@/hooks/pages/useDashboard";
import { cn } from "@/lib/utils";
import type { FC } from "react";
import IndexLayout from "./layouts/index.layout";
import { FaPlus } from "react-icons/fa";
import BtnBack from "@/components/BtnBack";

const NewTimeRecord: FC = () => {
  const { misHoras, handleHoursChange, handleAddHour, isSaving, setMisHoras, editingId } =
    useDashboard();

  return (
    <IndexLayout>
      <div className="w-full flex flex-col py-8 px-4">
        <div className="w-full flex items-center md:flex-row md:items-center justify-between gap-4 p-4 border-4 border-black bg-theme-bg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
          <div className="flex items-center gap-4">
            <BtnBack />
          </div>
        </div>
        <HoursForm formData={misHoras} onChange={handleHoursChange} setFormData={setMisHoras} />
        <button
          type="button"
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
              editingId ? "" : "group-hover:rotate-90"
            )}
          />
          {isSaving ? "Guardando..." : editingId ? "Actualizar" : "Registrar"}
        </button>

        {/* Spacer for mobile scroll */}
        <div className="h-8 xl:hidden"></div>
      </div>
    </IndexLayout>
  );
};

export default NewTimeRecord;
