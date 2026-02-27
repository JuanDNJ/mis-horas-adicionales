import type { FC } from "react";
import logo from "@/assets/logo.png";

type LogoProps = {
  variant?: "default" | "small";
};

const Logo: FC<LogoProps> = ({ variant = "default" }) => {
  return (
    <img
      src={logo}
      alt="Horas Adicionales Logo"
      className={`${variant === "small" ? "w-8 h-8" : "w-16 h-16"}  shrink-0`}
    />
  );
};

export default Logo;
