import type { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContentSectionProps {
  title: string | ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
  titleClassName?: string;
  cardClassName?: string;
  actionsClassName?: string;
}

const ContentSection: FC<ContentSectionProps> = ({
  title,
  children,
  actions,
  className,
  titleClassName,
  cardClassName,
  actionsClassName,
}) => {
  return (
    <section
      className={cn(
        "flex flex-col items-center min-h-fit max-w-7xl m-auto gap-6 md:gap-10 px-4 py-8 md:py-16",
        className
      )}
    >
      <header className="w-full">
        <h2
          className={cn(
            "text-theme-color font-bold text-center text-5xl md:text-7xl lg:text-9xl leading-tight text-wrap wrap-break-word",
            titleClassName
          )}
        >
          {title}
        </h2>
      </header>

      <article
        className={cn(
          "bg-white rounded-lg shadow-lg w-full max-w-5xl flex flex-col items-center justify-center p-6 md:p-12",
          cardClassName
        )}
      >
        {children}
      </article>

      {actions && (
        <footer className={cn("flex flex-wrap justify-center gap-4 py-6 w-full", actionsClassName)}>
          {actions}
        </footer>
      )}
    </section>
  );
};

export default ContentSection;
