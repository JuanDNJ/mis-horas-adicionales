import type { FC } from "react";
import ContentSection from "./ContentSection";

const Hero: FC = () => {
  return (
    <ContentSection
      title="Tu tiempo vale oro, Gestiónalo con estilo"
      actions={
        <>
          <button className="bg-amber-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-amber-600 transition-colors cursor-pointer">
            Accede ya
          </button>
          <button className="bg-blue-400 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-500 transition-colors cursor-pointer">
            Descubrir Más
          </button>
        </>
      }
    >
      <p className="text-center text-2xl md:text-4xl text-gray-800">
        Olvídate de las hojas de cálculo aburridas, registra tus horas, calcula tus ingresos y
        mantén el control total, con una estética que te encantará.
      </p>
    </ContentSection>
  );
};

export default Hero;
