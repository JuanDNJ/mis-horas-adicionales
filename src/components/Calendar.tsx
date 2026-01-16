import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { es } from "date-fns/locale";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) => {
  return (
    <DayPicker
      locale={es}
      showOutsideDays={showOutsideDays}
      className={cn(
        "p-3 border-4 border-black bg-theme-bg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
        className
      )}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 text-theme-color",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center mb-2",
        caption_label: "text-lg font-black uppercase tracking-wider",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          "h-7 w-7 bg-transparent p-0 flex items-center justify-center border-2 border-transparent hover:border-black transition-all hover:bg-black hover:text-white"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-secondary rounded-md w-9 font-normal text-[0.8rem] uppercase",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          "h-9 w-9 p-0 font-bold aria-selected:opacity-100 hover:bg-black hover:text-white border-2 border-transparent transition-all"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-theme-accent text-white hover:bg-theme-accent hover:text-white focus:bg-theme-accent focus:text-white border-2 border-black",
        day_today:
          "bg-theme-secondary/20 text-theme-color border-2 border-theme-secondary text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
};
