import type { FC } from "react";
import { useNavigate } from "react-router-dom";

const BtnBack: FC = () => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="text-sm font-bold uppercase text-theme-color hover:underline"
      onClick={() => navigate(-1)}
    >
      Volver
    </button>
  );
};

export default BtnBack;
