import type { FC } from "react";
import { FaImage } from "react-icons/fa";
import { TitleWithIcon } from "./TitleWithIcon";

export const Brand: FC = () => {
  return (
    <TitleWithIcon
      as="h1"
      title="Horas Adicionales"
      titleClassName="hidden sm:block text-2xl tracking-wider text-outline-white"
    >
      <FaImage className="text-2xl md:text-4xl text-theme-color drop-shadow-[2px_2px_0px_rgba(255,255,255,0.8)]" />
    </TitleWithIcon>
  );
};
