import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLOR_MAP = {
  Text: "#7c3aed",
  Call: "#19382f",
  Video: "#22c55e",
};

const Stats = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("kk_timeline") || "[]");

    const totals = { Text: 0, Call: 0, Video: 0 };

    storedData.forEach((item) => {
      if (totals[item.type] !== undefined) {
        totals[item.type] += 1;
      }
    });

    const hasValues = Object.values(totals).some((num) => num > 0);

    if (!hasValues) {
      setChartData([]);
      return;
    }

    const formatted = Object.entries(totals)
      .filter(([, val]) => val > 0)
      .map(([name, value]) => ({ name, value }));

    setChartData(formatted);
  }, []);

  const CustomLegend = ({ payload }) => (
    <div className="mt-3 flex justify-center gap-5">
      {payload.map((item) => (
        <div key={item.value} className="flex items-center gap-1.5">
          <span
            className="inline-block h-[10px] w-[10px] rounded-full"
            style={{ background: item.color }}
          />
          <span className="text-[13px] text-slate-700">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="min-h-screen bg-[#f9fbfd] px-6 py-10">
      <div className="mx-auto max-w-3xl">

        <h2 className="mb-8 text-3xl font-bold text-slate-900">
          Friendship Analytics
        </h2>

        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <h3 className="mb-6 text-base font-semibold text-slate-700">
            By Interaction Type
          </h3>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={85}
                outerRadius={135}
                paddingAngle={3}
                strokeWidth={0}
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={COLOR_MAP[entry.name] || "#94a3b8"}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value, name) => [
                  `${value} interactions`,
                  name,
                ]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  fontSize: "13px",
                }}
              />

              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default Stats;