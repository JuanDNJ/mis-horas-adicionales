import type { ElementType, FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TitleWithIconProps {
  as?: ElementType;
  title: string;
  children?: ReactNode;
  className?: string;
  titleClassName?: string;
}

export const TitleWithIcon: FC<TitleWithIconProps> = ({
  as: Tag = "h1",
  title,
  children,
  className,
  titleClassName,
}) => {
  return (
    <article className={cn("flex items-center gap-2 md:gap-4", className)}>
      {children}
      <Tag className={cn("text-theme-color", titleClassName)}>{title}</Tag>
    </article>
  );
};
