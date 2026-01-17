import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { DayPicker, useDayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { es } from "date-fns/locale";
import type { MonthCaptionProps } from "react-day-picker";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const buttonBaseClasses =
  "h-8 w-8 bg-transparent p-0 flex items-center justify-center border-2 border-black transition-all hover:bg-black hover:text-white text-theme-color";

const CustomMonthCaption = ({ calendarMonth }: MonthCaptionProps) => {
  const { goToMonth, nextMonth, previousMonth } = useDayPicker();
  const displayMonth = calendarMonth.date;

  const handleYearChange = (offset: number) => {
    const newDate = new Date(displayMonth);
    newDate.setFullYear(newDate.getFullYear() + offset);
    // Simplified checks for v9 as nextMonth/previousMonth are handled by hook
    goToMonth(newDate);
  };

  const handleMonthChange = (offset: number) => {
    if (offset < 0 && previousMonth) goToMonth(previousMonth);
    if (offset > 0 && nextMonth) goToMonth(nextMonth);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 mb-4 relative w-full pt-2">
      <div className="text-xl font-black tracking-wider text-theme-color uppercase">
        {displayMonth.toLocaleDateString("es", { month: "long", year: "numeric" })}
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => handleYearChange(-1)}
          className={cn(buttonBaseClasses, "disabled:opacity-40 disabled:cursor-not-allowed")}
          aria-label="Año anterior"
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => handleMonthChange(-1)}
          className={cn(buttonBaseClasses, "disabled:opacity-40 disabled:cursor-not-allowed")}
          aria-label="Mes anterior"
          disabled={!previousMonth}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => handleMonthChange(1)}
          className={cn(buttonBaseClasses, "disabled:opacity-40 disabled:cursor-not-allowed")}
          aria-label="Mes siguiente"
          disabled={!nextMonth}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => handleYearChange(1)}
          className={cn(buttonBaseClasses, "disabled:opacity-40 disabled:cursor-not-allowed")}
          aria-label="Año siguiente"
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

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
        caption_label: "hidden",
        nav: "hidden", // Hide default nav
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday: "text-secondary rounded-md w-9 font-normal text-[0.8rem] uppercase",
        week: "flex w-full mt-2",
        day: cn(
          "h-9 w-9 p-0 font-bold aria-selected:opacity-100 hover:bg-black hover:text-white border-2 border-transparent transition-all flex items-center justify-center"
        ),
        range_end: "day-range-end",
        selected:
          "bg-theme-accent text-white hover:bg-theme-accent hover:text-white focus:bg-theme-accent focus:text-white border-2 border-black",
        today:
          "bg-theme-secondary/20 text-theme-color border-2 border-theme-secondary text-accent-foreground",
        outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        disabled: "text-muted-foreground opacity-50",
        range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        MonthCaption: CustomMonthCaption,
        Nav: () => <></>, // Hide default navigation
      }}
      {...props}
    />
  );
};
