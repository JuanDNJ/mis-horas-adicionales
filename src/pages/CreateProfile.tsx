import Header from "@/components/Header";
import Main from "@/components/Main";
import { type FC, useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Save, User, Building2, Briefcase, Hash, Phone, Camera } from "lucide-react";
import { useProfileContext } from "@/hooks/useProfileContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { storage, auth } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Función para comprimir y redimensionar imagen
const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        // Configuración de compresión
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        const QUALITY = 0.8;

        let width = img.width;
        let height = img.height;

        // Redimensionar si es necesario manteniendo aspect ratio
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

        // Crear canvas y comprimir
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
            // Crear nuevo File con el blob comprimido
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
  const { displayName, photoURL: authPhotoURL } = useProfileContext();
  const { userProfile, updateProfile, isLoading: isSaving } = useUserProfile();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estado para la foto
  const [photoURL, setPhotoURL] = useState<string>(userProfile?.photoURL || authPhotoURL || "");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

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

  // Actualizar foto cuando cambie el perfil
  useEffect(() => {
    if (userProfile?.photoURL) {
      setPhotoURL(userProfile.photoURL);
    } else if (authPhotoURL) {
      setPhotoURL(authPhotoURL);
    }
  }, [userProfile?.photoURL, authPhotoURL]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo con lista blanca
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Solo se permiten imágenes JPG, PNG o WebP");
      return;
    }

    // Validar tamaño inicial (max 10MB antes de comprimir)
    if (file.size > 10 * 1024 * 1024) {
      alert("La imagen es demasiado grande. Por favor selecciona una imagen menor a 10MB");
      return;
    }

    setUploadingPhoto(true);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Usuario no autenticado");

      // Comprimir y redimensionar imagen
      const compressedFile = await compressImage(file);

      // Validar tamaño final después de comprimir (max 2MB)
      if (compressedFile.size > 2 * 1024 * 1024) {
        alert("La imagen sigue siendo muy pesada después de comprimirse. Intenta con otra imagen.");
        setUploadingPhoto(false);
        return;
      }

      // Crear referencia única en Storage
      const storageRef = ref(
        storage,
        `profile-photos/${currentUser.uid}/${Date.now()}_${file.name}`
      );

      // Subir archivo comprimido
      await uploadBytes(storageRef, compressedFile);

      // Obtener URL de descarga
      const downloadURL = await getDownloadURL(storageRef);

      // Actualizar estado local
      setPhotoURL(downloadURL);
    } catch (error) {
      console.error("Error al subir foto:", error);
      alert("Error al subir la foto. Intenta nuevamente.");
    } finally {
      setUploadingPhoto(false);
    }
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
              {/* Sección Foto - Ahora editable */}
              <div className="flex justify-center mb-4">
                <div className="relative group">
                  <div className="w-32 h-32 bg-slate-200 border-4 border-black rounded-full overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity">
                    {uploadingPhoto ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="text-white font-bold text-sm">Subiendo...</div>
                      </div>
                    ) : photoURL ? (
                      <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User
                        size={64}
                        className="text-slate-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      />
                    )}
                    {/* Overlay hover */}
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
                  />
                  {/* Botón de cámara */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 bg-cyan-400 hover:bg-cyan-500 border-4 border-black rounded-full p-2 shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] transition-all"
                  >
                    <Camera size={20} />
                  </button>
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
