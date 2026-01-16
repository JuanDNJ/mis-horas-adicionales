import type { FC } from "react";
import { Select } from "./Select";
import { UserMenu } from "./UserMenu";
import useThemeHook from "@/hooks/theme_hook";
import { cn } from "@/lib/utils";

export const HeaderControls: FC = () => {
  const { selectedTheme, onChangeTheme, themes } = useThemeHook();

  return (
    <article className="flex items-center gap-2 md:gap-4 z-50">
      <Select
        options={themes}
        value={selectedTheme}
        onChange={onChangeTheme}
        className="w-fit"
        renderItem={(theme, isSelected) => (
          <>
            <theme.icon className={cn("text-lg md:text-xl", theme.color)} />
            <span
              className={cn(
                "flex-1 font-bold text-lg hidden md:block",
                isSelected ? "text-option-selected" : "text-secondary"
              )}
            >
              {theme.name}
            </span>
            {isSelected && (
              <div className="w-2 h-2 rounded-full bg-select shadow-[0_0_8px_rgba(59,130,246,0.5)] ml-1 md:ml-2" />
            )}
          </>
        )}
      />
      <UserMenu />
    </article>
  );
};
