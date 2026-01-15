import { useState, useRef, useEffect, type ReactNode } from "react";
import { FaChevronDown } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface SelectOption {
  id: string;
  name: string;
  [key: string]: unknown;
}

interface SelectProps<T extends SelectOption> {
  label?: string;
  options: T[] | readonly T[];
  value: T;
  onChange: (option: T) => void;
  renderItem?: (option: T, isSelected: boolean) => ReactNode;
  className?: string;
}

export const Select = <T extends SelectOption>({
  label,
  options,
  value,
  onChange,
  renderItem,
  className,
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn("w-full max-w-xs space-y-3", className)} ref={dropdownRef}>
      {label && <label className="block text-sm font-semibold text-secondary ml-1">{label}</label>}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full flex items-center justify-between px-1 md:px-4 py-2 bg-theme-bg",
            "border-2 border-theme-color rounded-lg",
            "shadow-[4px_4px_0px_var(--theme-color)]",
            "hover:translate-x-px hover:translate-y-px hover:shadow-[3px_3px_0px_var(--theme-color)]",
            "active:translate-x-0.75 active:translate-y-0.75 active:shadow-none",
            "transition-all cursor-pointer outline-none",
            isOpen && "ring-2 ring-theme-color/20 border-theme-color"
          )}
        >
          <div className="flex items-center gap-1 md:gap-3">
            {renderItem ? (
              renderItem(value, true)
            ) : (
              <span className="font-medium text-theme-color">{value.name}</span>
            )}
          </div>
          <FaChevronDown
            className={cn(
              "text-secondary transition-transform duration-200 ml-1 md:ml-3",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 z-10 w-max min-w-full mt-2 py-2 bg-theme-bg border-2 border-theme-color rounded-lg shadow-[4px_4px_0px_var(--theme-color)] animate-in fade-in zoom-in duration-200">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2 hover:bg-theme-color/10 transition-colors text-left",
                  value.id === option.id && "bg-theme-color/20"
                )}
              >
                {renderItem ? (
                  renderItem(option, value.id === option.id)
                ) : (
                  <span
                    className={cn(
                      "flex-1 font-medium",
                      value.id === option.id ? "text-option-selected" : "text-secondary"
                    )}
                  >
                    {option.name}
                  </span>
                )}
                {value.id === option.id && !renderItem && (
                  <div className="w-2 h-2 rounded-full bg-select shadow-[0_0_8px_rgba(var(--color-select),0.5)]" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
