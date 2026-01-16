import Header from "@/components/Header";
import Main from "@/components/Main";
import { type FC, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Save, User, Building2, Briefcase, Hash, Phone } from "lucide-react";
import { useProfileContext } from "@/hooks/useProfileContext";
import { useUserProfile } from "@/hooks/useUserProfile";

const CreateProfile: FC = () => {
  const { displayName, photoURL } = useProfileContext();
  const { userProfile, updateProfile, isLoading: isSaving } = useUserProfile();
  const navigate = useNavigate();

  // Calcular valores iniciales del formulario
  const initialFormData = useMemo(
    () => ({
      displayName: userProfile?.displayName || displayName || "",
      jobTitle: userProfile?.jobTitle || "",
      sector: userProfile?.sector || "",
      employeeId: userProfile?.employeeId || "",
      phoneNumber: userProfile?.phoneNumber || "",
    }),
    [userProfile, displayName]
  );

  // Estado local
  const [formData, setFormData] = useState(initialFormData);

  // Actualizar formData cuando cambie el perfil
  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        displayName: formData.displayName,
        jobTitle: formData.jobTitle,
        sector: formData.sector,
        employeeId: formData.employeeId,
        phoneNumber: formData.phoneNumber,
        photoURL: photoURL || "", // Aseguramos que la foto se guarde
      });
      navigate("/profile");
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al guardar el perfil. Intenta nuevamente.");
    }
  };

  return (
    <>
      <Header />
      <Main>
        <div className="w-full max-w-2xl mx-auto p-4 md:p-6 font-mono">
          {/* Título de Página Estilo Comic */}
          <div className="mb-8 text-center relative">
            <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-black drop-shadow-[3px_3px_0_rgba(255,255,255,1)]">
              {userProfile ? "Editar Perfil" : "Crear Perfil"}
            </h1>
            <div className="absolute -top-4 -right-2 md:right-10 rotate-12 bg-cyan-400 border-4 border-black px-3 py-1 text-sm font-bold shadow-[4px_4px_0_0_#000]">
              {userProfile ? "Actualizar" : "¡Nuevo!"}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl"></div>
            <form
              onSubmit={handleSubmit}
              className="relative bg-white border-4 border-black p-6 md:p-8 rounded-xl flex flex-col gap-6"
            >
              {/* Sección Foto (Read Only visualmente por ahora) */}
              <div className="flex justify-center mb-4">
                <div className="w-32 h-32 bg-slate-200 border-4 border-black rounded-full overflow-hidden relative">
                  {photoURL ? (
                    <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User
                      size={64}
                      className="text-slate-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="font-black uppercase text-sm flex items-center gap-2">
                    <User size={18} /> Nombre Completo
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    className="w-full bg-yellow-100 border-4 border-black p-3 font-bold focus:outline-none focus:bg-yellow-200 focus:shadow-[4px_4px_0_0_#000] transition-all"
                    placeholder="Tu nombre..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-black uppercase text-sm flex items-center gap-2">
                      <Briefcase size={18} /> Cargo / Puesto
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className="w-full bg-white border-4 border-black p-3 font-bold focus:outline-none focus:bg-cyan-100 focus:shadow-[4px_4px_0_0_#000] transition-all"
                      placeholder="Ej. Diseñador"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-black uppercase text-sm flex items-center gap-2">
                      <Building2 size={18} /> Sector
                    </label>
                    <select
                      name="sector"
                      value={formData.sector}
                      onChange={handleChange}
                      className="w-full bg-white border-4 border-black p-3 font-bold focus:outline-none focus:bg-cyan-100 focus:shadow-[4px_4px_0_0_#000] transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Tecnología">Tecnología</option>
                      <option value="Recursos Humanos">Recursos Humanos</option>
                      <option value="Operaciones">Operaciones</option>
                      <option value="Ventas">Ventas</option>
                      <option value="Transporte">Transporte</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-black uppercase text-sm flex items-center gap-2">
                    <Hash size={18} /> ID de Empleado
                  </label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    className="w-full bg-white border-4 border-black p-3 font-bold focus:outline-none focus:bg-cyan-100 focus:shadow-[4px_4px_0_0_#000] transition-all"
                    placeholder="Ej. EMP-001"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-black uppercase text-sm flex items-center gap-2">
                    <Phone size={18} /> Telefono
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full bg-white border-4 border-black p-3 font-bold focus:outline-none focus:bg-cyan-100 focus:shadow-[4px_4px_0_0_#000] transition-all"
                    placeholder="Ej. +34 600 000 000"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="mt-4 bg-red-500 hover:bg-red-400 disabled:bg-gray-400 text-white font-black uppercase text-xl py-4 border-4 border-black shadow-[6px_6px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#000] transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                {isSaving ? (
                  "Guardando..."
                ) : (
                  <>
                    <Save size={24} /> Guardar Perfil
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </Main>
    </>
  );
};

export default CreateProfile;
