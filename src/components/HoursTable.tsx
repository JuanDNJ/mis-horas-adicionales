import { useNavigate } from "react-router-dom";
import { FaTrash, FaPen, FaEye } from "react-icons/fa";
import { type HoursRecord } from "@/lib/hoursService";

interface HoursTableProps {
  data: HoursRecord[];
  onDelete: (record: HoursRecord) => void;
  onEdit: (record: HoursRecord) => void;
  title?: string;
  showRoute?: boolean;
}

export const HoursTable = ({
  data,
  onDelete,
  onEdit,
  title,
  showRoute = true,
}: HoursTableProps) => {
  const navigate = useNavigate();

  if (data.length === 0) {
    return (
      <div className="w-full text-center p-8 border-4 border-black border-dashed bg-white/30 rounded-sm">
        <p className="text-xl font-bold text-secondary uppercase">
          No hay registros aún para {title}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 mb-8">
      {title && (
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-xl sm:text-2xl font-black uppercase text-theme-color drop-shadow-sm border-b-4 border-black inline-block pr-8 bg-white px-2 py-1 transform -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {title}
          </h2>
        </div>
      )}

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <table className="w-full bg-theme-bg text-left border-collapse">
          <thead>
            <tr className="bg-theme-header-bg border-b-4 border-black text-theme-color uppercase tracking-wider text-sm">
              <th className="p-4 border-r-2 border-black font-black">Fecha</th>
              <th className="p-4 border-r-2 border-black font-black hidden lg:table-cell">
                Horario
              </th>
              <th className="p-4 border-r-2 border-black font-black">Total</th>
              {showRoute && (
                <th className="p-4 border-r-2 border-black font-black hidden xl:table-cell">
                  Ruta
                </th>
              )}
              <th className="p-4 border-r-2 border-black font-black hidden 2xl:table-cell">
                Empleado
              </th>
              <th className="p-4 border-black font-black text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.id || index}
                className="border-b-2 border-black last:border-b-0 hover:bg-theme-accent/20 transition-colors duration-150 font-bold text-theme-secondary"
              >
                <td className="p-4 border-r-2 border-black">
                  {item.dia}/{item.mes}/{item.anio}
                </td>
                <td className="p-4 border-r-2 border-black whitespace-nowrap hidden lg:table-cell">
                  {item.hora_entrada} - {item.hora_salida}
                </td>
                <td className="p-4 border-r-2 border-black bg-theme-accent/10 text-theme-color">
                  {item.total_horas}h
                </td>
                {showRoute && (
                  <td
                    className="p-4 border-r-2 border-black max-w-50 truncate hidden xl:table-cell"
                    title={`${item.origen} -> ${item.destino}`}
                  >
                    {item.origen && item.destino ? (
                      <>
                        {item.origen} &rarr; {item.destino}
                      </>
                    ) : (
                      <span className="opacity-50 italic">N/A</span>
                    )}
                  </td>
                )}
                <td className="p-4 border-r-2 border-black hidden 2xl:table-cell">
                  {item.nombre} {item.apellido_paterno}
                  <div className="text-xs opacity-60 font-mono">{item.numero_empleado}</div>
                </td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    {item.id && (
                      <button
                        onClick={() => navigate(`/record/${item.id}`)}
                        className="p-2 bg-action-create hover:brightness-110 border-2 border-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
                        title="Ver detalle"
                      >
                        <FaEye size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => onEdit(item)}
                      className="p-2 bg-action-edit hover:brightness-110 border-2 border-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
                      title="Editar registro"
                    >
                      <FaPen size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className="p-2 bg-action-delete hover:brightness-110 border-2 border-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
                      title="Eliminar registro"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Grid View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {data.map((item, index) => (
          <div
            key={item.id || index}
            className="border-4 border-black bg-theme-bg p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative flex flex-col gap-2"
          >
            <div className="absolute top-2 right-2 flex gap-2">
              {item.id && (
                <button
                  type="button"
                  onClick={() => navigate(`/record/${item.id}`)}
                  className="p-2 bg-action-create hover:brightness-110 border-2 border-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                  title="Ver detalle"
                >
                  <FaEye size={14} />
                </button>
              )}
              <button
                type="button"
                onClick={() => onEdit(item)}
                className="p-2 bg-action-edit hover:brightness-110 border-2 border-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                title="Editar registro"
              >
                <FaPen size={14} />
              </button>
              <button
                type="button"
                onClick={() => onDelete(item)}
                className="p-2 bg-action-delete hover:brightness-110 border-2 border-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                title="Eliminar registro"
              >
                <FaTrash size={16} />
              </button>
            </div>

            <div className="border-b-2 border-black pb-2 mb-2 flex justify-between items-center mr-24">
              <span className="bg-theme-header-bg px-2 py-1 border-2 border-black text-xs font-bold uppercase tracking-widest">
                {item.dia}/{item.mes}/{item.anio}
              </span>
            </div>

            <div className="flex justify-between items-center text-theme-color font-bold">
              <div className="flex flex-col">
                <span className="text-xs text-secondary uppercase">Horario</span>
                <span>
                  {item.hora_entrada} - {item.hora_salida}
                </span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-xs text-secondary uppercase">Total</span>
                <span className="text-xl bg-theme-accent text-white px-2 border-2 border-black -rotate-2 shadow-sm inline-block">
                  {item.total_horas}h
                </span>
              </div>
            </div>

            {showRoute && (
              <div className="mt-2 text-sm font-semibold text-secondary border-t-2 border-dashed border-black pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  {item.origen || "N/A"}
                </div>
                <div className="ml-1 border-l-2 border-black h-3 my-0.5"></div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-theme-accent border border-black rounded-full"></div>
                  {item.destino || "N/A"}
                </div>
              </div>
            )}

            <div className="mt-2 pt-2 border-t-2 border-black text-xs text-right font-mono text-secondary">
              {item.nombre} {item.apellido_paterno} ({item.numero_empleado})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
