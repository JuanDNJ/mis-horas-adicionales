import { HoursTable } from "@/components/HoursTable";
import { Toolbar } from "@/components/Toolbar";
import IndexLayout from "./layouts/index.layout";
import useDashboard from "@/hooks/pages/useDashboard";
import { NavLink, useNavigate } from "react-router";
import { useEffect } from "react";
import useProfile from "@/hooks/pages/useProfile";

const Records = () => {
  const navigate = useNavigate();
  const {
    jobProfiles,
    horas,
    groupedHours,
    sortedCompanies,
    handleEditHour,
    handleDeleteHour,
    isLoading,
    error,
  } = useDashboard();
  const { userProfile, activeJobProfile } = useProfile();
  useEffect(() => {
    if (!activeJobProfile) {
      navigate("/create-profile");
    }
  }, [activeJobProfile, navigate]);

  return (
    <IndexLayout>
      <div className="w-full flex flex-col py-8 px-4">
        <Toolbar isAddDisabled={!userProfile} activeCompanyName={activeJobProfile?.companyName}>
          <NavLink
            to="/new-time-record"
            className="text-sm font-bold uppercase text-theme-color hover:underline"
          >
            Registrar Horas
          </NavLink>
        </Toolbar>

        <div className="flex flex-col xl:flex-row items-start justify-center w-full gap-8">
          {/* Table Column - Auto Expand */}
          <div className="w-full xl:flex-1 h-full animate-in fade-in duration-500">
            {error && (
              <div className="mb-4 p-4 bg-red-100 border-2 border-red-500 text-red-700 font-bold">
                {error}
              </div>
            )}
            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <div className="text-theme-color font-bold text-xl">Cargando registros...</div>
              </div>
            ) : horas.length === 0 ? (
              <HoursTable
                data={[]}
                onDelete={handleDeleteHour}
                onEdit={handleEditHour}
                title="Sin Registros"
              />
            ) : (
              <div className="space-y-12">
                {sortedCompanies.map((company) => {
                  // Buscar perfil de trabajo coincidente
                  const companyProfile = jobProfiles.find(
                    (p) => p.companyName.trim().toLowerCase() === company.trim().toLowerCase()
                  );

                  // Lógica para mostrar ruta:
                  // 1. Si existe perfil y es "Transporte" -> MOSTRAR (true)
                  // 2. Si existe perfil y es "General" -> OCULTAR (false)
                  // 3. Fallback: Si no hay perfil, verificar si hay datos reales de ruta en los registros
                  let showRoute = false;

                  if (companyProfile) {
                    showRoute = companyProfile.sector === "Transporte";
                  } else {
                    // Verificar si hay algún dato de ruta en este grupo de registros
                    const hasRouteData = groupedHours[company].some(
                      (r) =>
                        (r.origen && r.origen.trim().length > 0) ||
                        (r.destino && r.destino.trim().length > 0)
                    );
                    showRoute = hasRouteData;
                  }

                  return (
                    <HoursTable
                      key={company}
                      title={company}
                      data={groupedHours[company]}
                      onDelete={handleDeleteHour}
                      onEdit={handleEditHour}
                      showRoute={showRoute}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </IndexLayout>
  );
};

export default Records;
