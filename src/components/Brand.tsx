import type { FC } from "react";
import { TitleWithIcon } from "./TitleWithIcon";
export const Brand: FC = () => {
  return (
    <section className="hidden md:flex">
      <TitleWithIcon
        as="h1"
        title="Horas Adicionales"
        titleClassName="flex text-2xl tracking-wider text-outline-white"
      >
        <img src="/logo.png" alt="Horas Adicionales Logo" className="md:w-16 md:h-16  shrink-0" />
      </TitleWithIcon>
    </section>
  );
};
