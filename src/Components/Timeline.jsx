import { useEffect, useState } from "react";
import {
  MessageSquare,
  Phone,
  Video,
  Users,
  ChevronDown,
} from "lucide-react";

const ICON_CONFIG = {
  Text: {
    icon: MessageSquare,
    bg: "bg-[#eef4ff]",
    color: "text-[#4b6bfb]",
  },
  Call: {
    icon: Phone,
    bg: "bg-gray-100",
    color: "text-gray-700",
  },
  Video: {
    icon: Video,
    bg: "bg-gray-100",
    color: "text-gray-700",
  },
  Meetup: {
    icon: Users,
    bg: "bg-yellow-100",
    color: "text-yellow-700",
  },
};

const TimelineItem = ({ entry }) => {
  const config = ICON_CONFIG[entry.type] || ICON_CONFIG.Text;
  const Icon = config.icon;

  return (
    <div className="group flex items-center gap-4 border-b border-slate-100 py-4 transition-all hover:bg-white hover:px-2">
      
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.bg}`}>
        <Icon className={`${config.color}`} size={18} strokeWidth={2.4} />
      </div>

      <div className="flex flex-col">
        <p className="text-[0.9rem] leading-tight text-slate-900">
          <span className="font-bold">{entry.type}</span>{" "}
          <span className="text-slate-500">with {entry.with}</span>
        </p>
        <p className="mt-0.5 text-[0.78rem] text-slate-400">
          {entry.date}
        </p>
      </div>
    </div>
  );
};

const Timeline = () => {
  const [records, setRecords] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(() => {
    const storedData = localStorage.getItem("kk_timeline");

    if (storedData) {
      setRecords(JSON.parse(storedData));
    } else {
      const empty = [];
      localStorage.setItem("kk_timeline", JSON.stringify(empty));
      setRecords(empty);
    }
  }, []);

  const FILTERS = ["All", "Text", "Call", "Video"];

  const visibleData =
    selectedFilter === "All"
      ? records
      : records.filter((item) => item.type === selectedFilter);

  return (
    <section className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-[1200px]">

        <h2 className="mb-6 font-serif text-3xl font-bold text-[#172923]">
          Timeline
        </h2>

        {/* Filter */}
        <div className="relative mb-8 inline-block">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="min-w-[180px] cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-4 pr-10 text-sm text-slate-700 shadow-sm transition-colors hover:border-[#b8d0c5] outline-none"
          >
            {FILTERS.map((opt) => (
              <option key={opt} value={opt}>
                {opt === "All" ? "Filter timeline" : opt}
              </option>
            ))}
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>

        {/* Timeline List */}
        <div className="flex flex-col border-t border-slate-200">
          {visibleData.length === 0 ? (
            <p className="py-12 text-center text-2xl text-slate-400">
              No interactions yet.
            </p>
          ) : (
            visibleData.map((entry, idx) => (
              <TimelineItem key={entry.id ?? idx} entry={entry} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Timeline;