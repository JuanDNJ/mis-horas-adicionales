import { type FC } from "react";
import { useParams } from "react-router-dom";
import IndexLayout from "./layouts/index.layout";
import { Toolbar } from "@/components/Toolbar";
import BtnBack from "@/components/BtnBack";

interface TimeDetailProps extends Record<string, string | undefined> {
  id: string;
}

const TimeDetail: FC = () => {
  const { id } = useParams<TimeDetailProps>();
  if (!id) {
    return (
      <IndexLayout>
        <section className="w-full flex flex-col py-8 px-4">
          <Toolbar>
            <BtnBack />
          </Toolbar>
          <div className="flex items-center justify-center p-8">
            <div className="text-theme-color font-bold text-xl">Registro no encontrado</div>
          </div>
        </section>
      </IndexLayout>
    );
  }
  return (
    <IndexLayout>
      <section className="w-full flex flex-col py-8 px-4">
        <Toolbar>
          <BtnBack />
        </Toolbar>
        <div className="flex items-center justify-center p-8">
          <div className="text-theme-color font-bold text-xl">Detalles del registro ID: {id}</div>
        </div>
      </section>
    </IndexLayout>
  );
};

export default TimeDetail;
