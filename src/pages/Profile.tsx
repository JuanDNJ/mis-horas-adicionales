import Header from "@/components/Header";
import Main from "@/components/Main";
import { type FC } from "react";

const Profile: FC = () => {
  return (
    <>
      <Header />
      <Main>
        <section className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 mx-4">
          <article className="w-24 h-24 bg-gray-300 rounded-full mb-4 flex items-center justify-center text-4xl text-gray-600 font-bold">
            U
          </article>
          <h2 className="text-2xl font-bold text-theme-color mb-2">Usuario</h2>
          <p className="text-secondary mb-6 text-center">
            Bienvenido a tu perfil. Aquí podrás gestionar tu información personal y ajustes.
          </p>
          <article className="w-full space-y-3">
            <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex justify-between">
              <span className="text-secondary font-medium">Email:</span>
              <span className="text-theme-color font-bold">usuario@ejemplo.com</span>
            </div>
            <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex justify-between">
              <span className="text-secondary font-medium">Rol:</span>
              <span className="text-theme-color font-bold">Administrador</span>
            </div>
          </article>
        </section>
      </Main>
    </>
  );
};

export default Profile;
