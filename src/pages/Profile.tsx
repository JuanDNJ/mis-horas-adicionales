import Header from "@/components/Header";
import { type FC } from "react";

const Profile: FC = () => {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen bg-black/50 p-4 md:p-10 flex flex-col items-center pt-24 overflow-x-hidden">
        <div className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 mx-4">
          <div className="w-24 h-24 bg-gray-300 rounded-full mb-4 flex items-center justify-center text-4xl text-gray-600 font-bold">
            U
          </div>
          <h2 className="text-2xl font-bold text-theme-color mb-2">Usuario</h2>
          <p className="text-secondary mb-6 text-center">
            Bienvenido a tu perfil. Aquí podrás gestionar tu información personal y ajustes.
          </p>
          <div className="w-full space-y-3">
            <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex justify-between">
              <span className="text-secondary font-medium">Email:</span>
              <span className="text-theme-color font-bold">usuario@ejemplo.com</span>
            </div>
            <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex justify-between">
              <span className="text-secondary font-medium">Rol:</span>
              <span className="text-theme-color font-bold">Administrador</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
