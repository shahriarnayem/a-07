import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = {
    Text: "#7c3aed",
    Call: "#1e4035",
    Video: "#22c55e",
};

const Stats = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("kk_timeline") || "[]");

        const counts = { Text: 0, Call: 0, Video: 0 };
        stored.forEach((entry) => {
            if (counts[entry.type] !== undefined) {
                counts[entry.type]++;
            }
        });

        const hasData = Object.values(counts).some((v) => v > 0);
        if (!hasData) {
            setData([]);
        } else {
            setData(
                Object.entries(counts)
                    .filter(([, v]) => v > 0)
                    .map(([name, value]) => ({ name, value }))
            );
        }
    }, []);

    const renderLegend = (props) => {
        const { payload } = props;
        return (
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "12px" }}>
                {payload.map((entry) => (
                    <div key={entry.value} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{
                            width: 10, height: 10, borderRadius: "50%",
                            background: entry.color, display: "inline-block"
                        }} />
                        <span style={{ fontSize: "13px", color: "#374151" }}>{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <section className="min-h-screen bg-[#f8fafc] px-6 py-10">
            <div className="max-w-3xl mx-auto">

                <h2 className="text-3xl font-bold text-slate-800 mb-8">Friendship Analytics</h2>

                <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                    <h3 className="text-base font-semibold text-slate-700 mb-6">By Interaction Type</h3>

                    <ResponsiveContainer width="100%" height={320}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={90}
                                outerRadius={140}
                                paddingAngle={3}
                                dataKey="value"
                                strokeWidth={0}>
                                {data.map((entry) => (
                                    <Cell key={entry.name} fill={COLORS[entry.name] || "#94a3b8"} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value, name) => [`${value} interactions`, name]}
                                contentStyle={{
                                    borderRadius: "8px",
                                    border: "1px solid #e2e8f0",
                                    fontSize: "13px",
                                }} />
                            <Legend content={renderLegend} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </section>
    );
};

export default Stats;