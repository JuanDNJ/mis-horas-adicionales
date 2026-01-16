import { useRef, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PopoverProps {
  trigger: ReactNode;
  content: ReactNode;
  className?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const Popover = ({ trigger, content, className, isOpen, onOpenChange }: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onOpenChange(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onOpenChange]);

  return (
    <div className="relative inline-block w-full" ref={popoverRef}>
      <div onClick={() => onOpenChange(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-2 bg-theme-bg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black animate-in fade-in zoom-in-95 duration-200",
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};
