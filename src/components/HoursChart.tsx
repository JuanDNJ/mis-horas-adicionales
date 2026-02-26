import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { type FC } from "react";
import { cn } from "@/lib/utils";

interface HoursChartProps {
  data: { company: string; total: number }[];
  className?: string;
}

const COLORS = ["#facc15", "#ef4444", "#3b82f6", "#22c55e", "#a855f7"];

interface TooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border-2 border-black p-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-xs font-black uppercase">
        <p className="mb-1">{label}</p>
        <p className="text-red-500">
          {payload[0].value} <span className="text-black">HRS</span>
        </p>
      </div>
    );
  }
  return null;
};

export const HoursChart: FC<HoursChartProps> = ({ data, className }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className={cn("w-full min-h-50", className)}>
      {/* Contenedor con estilo comic */}
      <div className="bg-white border-4 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg box-border w-full h-full">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: -20, // Ajuste para que el eje Y no ocupe mucho
              bottom: 5,
            }}
          >
            <XAxis
              dataKey="company"
              tick={{
                fill: "black",
                fontSize: 10,
                fontWeight: 900,
                fontFamily: "monospace",
              }}
              axisLine={{ stroke: "black", strokeWidth: 2 }}
              tickLine={false}
              interval={0} // Mostrar todas las etiquetas
              tickFormatter={(val) => val.slice(0, 4)} // Cortar nombres largos
            />
            <YAxis
              tick={{
                fill: "black",
                fontSize: 10,
                fontWeight: 900,
                fontFamily: "monospace",
              }}
              axisLine={{ stroke: "black", strokeWidth: 2 }}
              tickLine={{ stroke: "black", strokeWidth: 2 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.1)" }} />
            <Bar dataKey="total" radius={[4, 4, 0, 0]}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="black"
                  strokeWidth={2}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
