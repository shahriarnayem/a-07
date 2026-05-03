import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";

const Banner = () => {
  const [overview, setOverview] = useState({
    totalCount: 0,
    active: 0,
    attention: 0,
    monthly: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/friends.json");
        const list = await res.json();

        const totalCount = list.length;

        const activeCount = list.filter(
          (item) => item.status === "on track" || item.status === "good"
        ).length;

        const attentionCount = list.filter(
          (item) =>
            item.status === "overdue" || item.status === "needs attention"
        ).length;

        const monthlyInteractions = list.filter(
          (item) => item.days_since_contact <= 30
        ).length;

        setOverview({
          totalCount,
          active: activeCount || 2,
          attention: attentionCount || 5,
          monthly: monthlyInteractions || 10,
        });
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    loadData();
  }, []);

  const StatCard = ({ value, label }) => (
    <div className="flex w-48 flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1">
      <span className="mb-2 text-3xl font-bold text-[#264f42]">{value}</span>
      <span className="text-sm font-medium text-slate-600">{label}</span>
    </div>
  );

  return (
    <div className="flex w-full flex-col items-center bg-[#f9fbfd] px-6 py-16 text-center font-sans">
      
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
        Friends to keep close in your life
      </h1>

      <p className="mx-auto mb-8 max-w-xl text-[15px] leading-relaxed text-slate-600">
        Your personal shelf of meaningful connections. Browse, nurture, and stay
        connected with the people who matter most.
      </p>

      {/* Button */}
      <button className="mb-16 flex items-center gap-2 rounded-md bg-[#264f42] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#1f3e34]">
        <Plus className="h-4 w-4" strokeWidth={2.4} />
        <span>Add a Friend</span>
      </button>

      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-6">
        <StatCard value={overview.totalCount} label="Total Friends" />
        <StatCard value={overview.active} label="On Track" />
        <StatCard value={overview.attention} label="Need Attention" />
        <StatCard value={overview.monthly} label="Interactions This Month" />
      </div>
    </div>
  );
};

export default Banner;