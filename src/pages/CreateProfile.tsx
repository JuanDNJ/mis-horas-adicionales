import { type FC, useState, useEffect, useRef } from "react";
import { Save, User, Briefcase, Hash, Camera, Plus, Trash2, Edit, Check, Star } from "lucide-react";
import { useProfileContext } from "@/hooks/useProfileContext";
import { storage, auth } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import type { JobProfile } from "@/context/types/index";
import IndexLayout from "./layouts/index.layout";

// Función para comprimir y redimensionar imagen (Mantenida igual)
const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        const QUALITY = 0.8;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_WIDTH) {
            height = (height * MAX_WIDTH) / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = (width * MAX_HEIGHT) / height;
            height = MAX_HEIGHT;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("No se pudo crear el contexto del canvas"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Error al comprimir la imagen"));
              return;
            }
            const compressedFile = new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          "image/jpeg",
          QUALITY
        );
      };
      img.onerror = () => reject(new Error("Error al cargar la imagen"));
    };
    reader.onerror = () => reject(new Error("Error al leer el archivo"));
  });
};

const CreateProfile: FC = () => {
  const {
    userProfile,
    jobProfiles,
    activeJobProfile,
    updateUserProfile,
    addJobProfile,
    updateJobProfile,
    deleteJobProfile,
  } = useProfileContext();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- States ---

  // 1. Datos Personales
  const [photoURL, setPhotoURL] = useState<string>(userProfile?.photoURL || "");
  const [personalData, setPersonalData] = useState({
    displayName: userProfile?.displayName || "",
    phoneNumber: userProfile?.phoneNumber || "",
  });
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // 2. Gestión de Jobs
  const [isEditingJob, setIsEditingJob] = useState(false);
  const [jobFormErrors, setJobFormErrors] = useState<string | null>(null);
  const [currentJobId, setCurrentJobId] = useState<string | null>(null); // null = creando nuevo
  const [jobData, setJobData] = useState({
    companyName: "",
    jobTitle: "",
    employeeId: "",
    sector: "General" as "General" | "Transporte",
  });

  // --- Effects ---

  // Sincronizar estado local con contexto si carga después
  useEffect(() => {
    if (userProfile) {
      setPersonalData({
        displayName: userProfile.displayName || "",
        phoneNumber: userProfile.phoneNumber || "",
      });
      setPhotoURL(userProfile.photoURL || "");
    }
  }, [userProfile]);

  // --- Handlers Personales ---

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Solo se permiten imágenes JPG, PNG o WebP");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("La imagen es demasiado grande. Max 10MB");
      return;
    }

    setUploadingPhoto(true);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Usuario no autenticado");

      const compressedFile = await compressImage(file);
      if (compressedFile.size > 2 * 1024 * 1024) {
        alert("La imagen sigue siendo muy pesada. Intenta con otra.");
        return;
      }

      const storageRef = ref(
        storage,
        `profile-photos/${currentUser.uid}/${Date.now()}_${file.name}`
      );
      await uploadBytes(storageRef, compressedFile);
      const downloadURL = await getDownloadURL(storageRef);
      setPhotoURL(downloadURL);

      // Guardar inmediatamente la foto en el perfil si ya existe
      if (userProfile) {
        await updateUserProfile({ photoURL: downloadURL });
      }
    } catch (error) {
      console.error("Error al subir foto:", error);
      alert("Error al subir la foto.");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const savePersonalData = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserProfile({
        displayName: personalData.displayName,
        phoneNumber: personalData.phoneNumber,
        photoURL: photoURL,
      });
      alert("Datos personales actualizados.");
    } catch (error) {
      console.error("Error al guardar personal:", error);
      alert("Error al guardar datos personales.");
    }
  };

  // --- Handlers Jobs ---

  const openNewJobForm = () => {
    setJobData({
      companyName: "",
      jobTitle: "",
      employeeId: "",
      sector: "General",
    });
    setCurrentJobId(null);
    setIsEditingJob(true);
    setJobFormErrors(null);
  };

  const openEditJobForm = (job: JobProfile) => {
    setJobData({
      companyName: job.companyName,
      jobTitle: job.jobTitle,
      employeeId: job.employeeId,
      sector: job.sector,
    });
    setCurrentJobId(job.id);
    setIsEditingJob(true);
    setJobFormErrors(null);
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setJobFormErrors(null);

    // Validación básica
    if (!jobData.companyName.trim()) {
      setJobFormErrors("El nombre de la empresa es obligatorio.");
      return;
    }

    try {
      if (currentJobId) {
        // Editando
        await updateJobProfile(currentJobId, jobData);
      } else {
        // Creando
        await addJobProfile(jobData);
      }
      setIsEditingJob(false);
    } catch (error) {
      console.error("Error saving job:", error);
      setJobFormErrors("Error al guardar el empleo.");
    }
  };

  const handleDeleteJob = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("¿Seguro que quieres eliminar este perfil de trabajo?")) {
      try {
        await deleteJobProfile(id);
      } catch (error: unknown) {
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    }
  };

  const handleSetDefault = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Al establecer como default NO actualizamos el timestamp (gracias al cambio en Context)
    // por lo que NO cambiará el "Último Activo"
    await updateJobProfile(id, { isDefault: true });
  };

  return (
    <IndexLayout>
      <div className="w-full max-w-4xl mx-auto p-4 md:p-6 font-mono pb-20">
        <div className="mb-8 text-center relative">
          <h1 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter text-black drop-shadow-[3px_3px_0_rgba(255,255,255,1)]">
            {activeJobProfile ? "Editar Perfil de Trabajo" : "Crear Perfil de Trabajo"}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Lado Izquierdo: Datos Personales */}
          <div className="lg:col-span-1">
            <div className="relative">
              <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-xl"></div>
              <div className="relative bg-white border-4 border-black p-6 rounded-xl flex flex-col gap-6">
                {/* Foto */}
                <div className="flex justify-center">
                  <div className="relative group">
                    <div className="w-32 h-32 bg-slate-200 border-4 border-black rounded-full overflow-hidden relative cursor-pointer">
                      {uploadingPhoto ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-bold text-xs">
                          Subiendo...
                        </div>
                      ) : photoURL ? (
                        <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User
                          size={64}
                          className="text-slate-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        />
                      )}
                      <div
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Camera className="text-white" size={32} />
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                      aria-label="Subir foto de perfil"
                    />
                  </div>
                </div>

                <form onSubmit={savePersonalData} className="flex flex-col gap-4">
                  <div>
                    <label className="font-black uppercase text-xs mb-1 block">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      name="displayName"
                      value={personalData.displayName}
                      onChange={handlePersonalChange}
                      className="w-full text-sm bg-yellow-100 border-2 border-black p-2 font-bold focus:outline-none focus:shadow-[2px_2px_0_0_#000]"
                      placeholder="Tu nombre..."
                    />
                  </div>
                  <div>
                    <label className="font-black uppercase text-xs mb-1 block">Teléfono</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={personalData.phoneNumber}
                      onChange={handlePersonalChange}
                      className="w-full text-sm bg-white border-2 border-black p-2 font-bold focus:outline-none focus:shadow-[2px_2px_0_0_#000]"
                      placeholder="+34..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="text-sm bg-cyan-400 text-black font-bold py-2 border-2 border-black shadow-[3px_3px_0_0_#000] hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_#000] active:translate-y-1 active:shadow-none transition-all flex justify-center items-center gap-2"
                  >
                    <Save size={16} /> Guardar datos personales
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Lado Derecho: Mis Empleos */}
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-end mb-4">
              <h2 className="md:w-full text-2xl font-black uppercase italic bg-yellow-300 px-2 border-2 border-black inline-block shadow-[3px_3px_0_0_#000]">
                Mis Empleos
              </h2>
              {!isEditingJob && (
                <button
                  type="button"
                  onClick={openNewJobForm}
                  className="bg-green-500 text-white font-bold px-3 py-1 border-2 border-black shadow-[3px_3px_0_0_#000] hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-1 text-sm"
                >
                  <Plus size={16} /> Añadir Empleo
                </button>
              )}
            </div>

            {isEditingJob ? (
              // --- Formulario de Trabajo ---
              <div className="relative animate-in fade-in slide-in-from-bottom-4">
                <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl"></div>
                <form
                  onSubmit={handleJobSubmit}
                  className="relative bg-white border-4 border-black p-6 rounded-xl flex flex-col gap-4"
                >
                  <h3 className="font-black text-xl uppercase border-b-2 border-black pb-2 mb-2">
                    {currentJobId ? "Editar Empleo" : "Nuevo Empleo"}
                  </h3>

                  {jobFormErrors && (
                    <div className="bg-red-100 border-2 border-red-500 text-red-700 p-2 font-bold text-sm">
                      {jobFormErrors}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-sm mb-1 block">Empresa *</label>
                      <input
                        autoFocus
                        type="text"
                        value={jobData.companyName}
                        onChange={(e) => setJobData({ ...jobData, companyName: e.target.value })}
                        className="text-sm w-full border-2 border-black p-2 font-bold"
                        placeholder="Nombre de la empresa"
                        title="Nombre de la empresa"
                        aria-label="Nombre de la empresa"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-sm mb-1 block">Cargo / Puesto</label>
                      <input
                        type="text"
                        value={jobData.jobTitle}
                        onChange={(e) => setJobData({ ...jobData, jobTitle: e.target.value })}
                        className="text-sm w-full border-2 border-black p-2 font-bold"
                        placeholder="Ej. Conductor, Admin..."
                        title="Cargo o puesto de trabajo"
                        aria-label="Cargo o puesto de trabajo"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-sm mb-1 block">No. Empleado</label>
                      <input
                        type="text"
                        value={jobData.employeeId}
                        onChange={(e) => setJobData({ ...jobData, employeeId: e.target.value })}
                        className="text-sm w-full border-2 border-black p-2 font-bold"
                        placeholder="ID numérico o alfa"
                        title="Número o identificador de empleado"
                      />
                    </div>
                    <div>
                      <label htmlFor="sector-select" className="font-bold text-sm mb-1 block">
                        Sector
                      </label>
                      <select
                        id="sector-select"
                        value={jobData.sector}
                        onChange={(e) =>
                          setJobData({
                            ...jobData,
                            sector: e.target.value as "General" | "Transporte",
                          })
                        }
                        className="text-sm w-full border-2 border-black p-2 font-bold cursor-pointer"
                        title="Selecciona el sector de trabajo"
                      >
                        <option value="General">General</option>
                        <option value="Transporte">Transporte</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-4">
                    <button
                      type="submit"
                      className="text-sm flex-1 bg-blue-500 text-white font-bold py-2 hover:bg-gray-800 transition-colors"
                    >
                      {currentJobId ? "Actualizar" : "Guardar"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingJob(false)}
                      className="text-sm flex-1 bg-red-500 border-2 border-black text-white font-bold py-2 hover:bg-gray-100 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              // --- Lista de Trabajos ---
              <div className="flex flex-col gap-4">
                {jobProfiles.length === 0 ? (
                  <div className="bg-gray-100 border-2 border-dashed border-gray-400 p-8 text-center text-gray-500 rounded-lg">
                    No tienes empleos registrados. ¡Añade uno para empezar a fichar!
                  </div>
                ) : (
                  jobProfiles.map((job) => (
                    <div
                      key={job.id}
                      className={`relative group transition-transform hover:-translate-y-1 duration-200 ${activeJobProfile?.id === job.id ? "z-10" : ""}`}
                    >
                      {/* Sombra */}
                      <div
                        className={`absolute inset-0 translate-x-1 translate-y-1 rounded-lg border-2 border-black ${job.isDefault ? "bg-black" : "bg-gray-800"}`}
                      ></div>

                      {/* Tarjeta */}
                      <div
                        className={`relative border-2 border-black p-4 rounded-lg flex justify-between items-center ${activeJobProfile?.id === job.id ? "bg-yellow-100 ring-2 ring-yellow-400" : "bg-white"}`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-black text-lg uppercase">{job.companyName}</h3>
                            {job.isDefault && (
                              <span className="text-[10px] bg-black text-white px-1 py-0.5 rounded font-bold">
                                DEFAULT
                              </span>
                            )}
                            {activeJobProfile?.id === job.id && (
                              <span className="text-[10px] bg-green-500 text-white px-1 py-0.5 rounded font-bold flex items-center gap-1">
                                <Check size={8} /> ACTIVO
                              </span>
                            )}
                          </div>
                          <div className="text-sm font-bold text-gray-600 flex gap-4">
                            <span className="flex items-center gap-1">
                              <Briefcase size={14} /> {job.jobTitle || "Sin cargo"}
                            </span>
                            <span className="flex items-center gap-1">
                              <Hash size={14} /> {job.employeeId || "N/A"}
                            </span>
                          </div>
                          <div className="mt-2 text-xs font-mono text-gray-500 hidden sm:block">
                            Sector: {job.sector}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 pl-4 border-l-2 border-gray-200">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditJobForm(job);
                            }}
                            className="p-1.5 hover:bg-gray-200 rounded text-blue-600 transition-colors"
                            title="Editar"
                          >
                            <Edit size={18} />
                          </button>

                          {!job.isDefault && (
                            <button
                              onClick={(e) => handleDeleteJob(job.id, e)}
                              className="p-1.5 hover:bg-red-100 rounded text-red-500 transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}

                          {!job.isDefault && (
                            <button
                              onClick={(e) => handleSetDefault(job.id, e)}
                              className="p-1.5 hover:bg-yellow-100 rounded text-yellow-600 border-2 border-transparent hover:border-yellow-200"
                              title="Marcar como Principal"
                            >
                              <Star size={18} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </IndexLayout>
  );
};

export default CreateProfile;
