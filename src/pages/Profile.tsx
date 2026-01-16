import Header from "@/components/Header";
import Main from "@/components/Main";
import { type FC } from "react";
import {
  User,
  Zap,
  Building2,
  Briefcase,
  Pencil,
  Camera,
  Plus,
  AlertTriangle,
  Phone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useProfileContext } from "@/hooks/useProfileContext";

const Profile: FC = () => {
  // Obtenemos datos básicos del contexto global/autenticación
  const { displayName: authDisplayName, photoURL: authPhotoURL } = useProfileContext();
  // Obtenemos el perfil completo de Firestore
  const { userProfile, isLoading } = useUserProfile();
  const navigate = useNavigate();

  // Preferimos los datos del perfil de Firestore, sino los de Auth
  const displayName = userProfile?.displayName || authDisplayName || "USUARIO ANONIMO";
  const photoURL = userProfile?.photoURL || authPhotoURL;
  const phoneNumber = userProfile?.phoneNumber;
  const employeeId = userProfile?.employeeId;

  // Si está cargando, podríamos mostrar un spinner, pero por ahora mostramos el layout
  // Calculamos si falta info crítica
  const hasMissingInfo =
    !userProfile || !userProfile.jobTitle || !userProfile.sector || !userProfile.employeeId;

  return (
    <>
      <Header />
      <Main>
        <div className="w-full max-w-7xl mx-auto p-6 font-mono">
          {hasMissingInfo && !isLoading && (
            <div
              className="mb-8 relative group cursor-pointer"
              onClick={() => navigate("/create-profile")}
            >
              <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 box-border"></div>
              <div className="relative bg-yellow-300 border-4 border-black p-4 flex flex-col sm:flex-row justify-between items-center gap-4 hover:-translate-y-1 hover:-translate-x-1 hover:bg-yellow-400 transition-all">
                <div className="flex items-center gap-4">
                  <div className="bg-red-500 text-white p-2 border-2 border-black rounded-full shrink-0">
                    <AlertTriangle size={24} fill="white" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-black uppercase text-lg leading-none">Perfil Incompleto</h3>
                    <p className="font-bold text-xs text-slate-800 mt-1">
                      ¡Completa tu ficha para operar!
                    </p>
                  </div>
                </div>
                <div className="bg-white px-3 py-2 font-black uppercase text-sm border-2 border-black shadow-[2px_2px_0_0_#000] flex items-center gap-2">
                  Completar Ahora <Pencil size={14} />
                </div>
              </div>
            </div>
          )}

          <div className="relative mb-8">
            <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 box-border"></div>
            <div className="relative bg-white border-4 border-black p-4 md:p-6 -rotate-1 box-border">
              {/* Edit Button Absolute */}
              <button
                onClick={() => navigate("/create-profile")}
                className="absolute top-2 right-2 p-2 bg-white border-2 border-black hover:bg-yellow-300 transition-colors z-10 shadow-[2px_2px_0_0_#000]"
                title="Editar Datos"
              >
                <Pencil size={16} />
              </button>

              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div
                  className="relative shrink-0 group cursor-pointer"
                  onClick={() => navigate("/create-profile")}
                >
                  <div className="w-24 h-24 bg-cyan-400 border-4 border-black rounded-full flex items-center justify-center overflow-hidden box-border relative">
                    {photoURL ? (
                      <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User size={48} className="text-black" />
                    )}
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="text-white drop-shadow-md" size={24} />
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white p-1 border-2 border-black rotate-12 box-border">
                    <Zap size={16} fill="white" />
                  </div>
                </div>
                <div className="text-center sm:text-left w-full overflow-hidden">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h1 className="text-2xl sm:text-4xl font-black uppercase italic tracking-tighter mb-2 leading-none break-words">
                      {displayName}
                    </h1>
                  </div>

                  {/* Phone Number Display */}
                  {phoneNumber && (
                    <div className="flex justify-center sm:justify-start items-center gap-2 mb-2">
                      <Phone size={14} className="text-slate-600" />
                      <span className="font-bold text-sm text-slate-600">{phoneNumber}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    {userProfile?.jobTitle ? (
                      <div className="bg-black text-yellow-400 px-3 py-1 text-xs font-bold uppercase skew-x-[-10deg] box-border">
                        {userProfile.jobTitle}
                      </div>
                    ) : (
                      <button
                        onClick={() => navigate("/create-profile")}
                        className="bg-amber-100 text-amber-700 hover:text-amber-900 px-3 py-1 text-xs font-bold uppercase skew-x-[-10deg] border-2 border-amber-500 box-border flex items-center gap-1 cursor-pointer"
                      >
                        Definir Puesto <Plus size={10} strokeWidth={4} />
                      </button>
                    )}

                    {employeeId ? (
                      <div className="bg-red-500 text-white px-2 py-1 text-xs font-bold uppercase border-2 border-black box-border">
                        ID: {employeeId}
                      </div>
                    ) : (
                      <div className="bg-red-100 text-red-700 px-2 py-1 text-xs font-bold uppercase border-2 border-red-500 box-border">
                        ID: Sin Asignar
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-crosshair box-border group">
              <div className="flex justify-between items-center border-b-2 border-black mb-3 pb-2">
                <h2 className="font-black uppercase text-sm flex items-center gap-2 italic">
                  <Building2 size={16} /> Sector Actual
                </h2>
                <button
                  onClick={() => navigate("/create-profile")}
                  className="opacity-0 group-hover:opacity-100 text-[10px] font-black bg-cyan-300 border-2 border-black px-2 hover:bg-cyan-400 transition-all uppercase"
                >
                  Editar
                </button>
              </div>
              <p
                className={
                  userProfile?.sector
                    ? "font-bold text-slate-700"
                    : "font-bold text-amber-600 italic"
                }
              >
                {userProfile?.sector || "Pendiente de definir"}
              </p>
            </div>
            <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-crosshair box-border group">
              <div className="flex justify-between items-center border-b-2 border-black mb-3 pb-2">
                <h2 className="font-black uppercase text-sm flex items-center gap-2 italic">
                  <Briefcase size={16} /> Cargo
                </h2>
                <button
                  onClick={() => navigate("/create-profile")}
                  className="opacity-0 group-hover:opacity-100 text-[10px] font-black bg-cyan-300 border-2 border-black px-2 hover:bg-cyan-400 transition-all uppercase"
                >
                  Editar
                </button>
              </div>
              <p
                className={
                  userProfile?.jobTitle
                    ? "font-bold text-slate-700"
                    : "font-bold text-amber-600 italic"
                }
              >
                {userProfile?.jobTitle || "Pendiente de definir"}
              </p>
            </div>
          </div>

          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-2xl transition-transform group-hover:translate-x-1 group-hover:translate-y-1 box-border"></div>
            <div className="relative bg-red-500 border-4 border-black p-6 rounded-2xl text-white hover:bg-red-600 transition-colors box-border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl sm:text-2xl font-black italic uppercase">Bolsa de Horas</h2>
                <div className="bg-white text-black px-2 py-1 font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] box-border">
                  {userProfile?.status || "INACTIVO"}
                </div>
              </div>
              <div className="flex items-end gap-2 flex-wrap">
                <span className="text-5xl sm:text-6xl font-black leading-none tracking-tighter shadow-black drop-shadow-sm">
                  {userProfile?.totalHours || "0"}
                </span>
                <span className="text-lg sm:text-xl font-black uppercase underline decoration-white decoration-4 mb-2">
                  Registradas!
                </span>
              </div>
            </div>
          </div>
        </div>
      </Main>
    </>
  );
};
export default Profile;
