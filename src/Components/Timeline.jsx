import { useState, useEffect } from "react";
import { MessageSquare, Phone, Video, Users, ChevronDown } from "lucide-react";

const iconMap = {
  Text: { icon: MessageSquare, bg: "bg-[#e8f0fe]", color: "text-[#4b6bfb]" },
  Call: { icon: Phone, bg: "bg-gray-100", color: "text-gray-700" },
  Video: { icon: Video, bg: "bg-gray-100", color: "text-gray-700" },
  Meetup: { icon: Users, bg: "bg-yellow-100", color: "text-yellow-700" },
};

const Timeline = () => {
  const [interactions, setInteractions] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const stored = localStorage.getItem("kk_timeline");
    if (stored) {
      setInteractions(JSON.parse(stored));
    } else {
      const seed = [];
      localStorage.setItem("timeline", JSON.stringify(seed));
      setInteractions(seed);
    }
  }, []);

  const filterOptions = ["All", "Text", "Call", "Video",];

  const filtered = filter === "All" 
    ? interactions 
    : interactions.filter((i) => i.type === filter);

  return (
    <section className="bg-slate-50 min-h-screen px-6 py-12">
      <div className="max-w-[720px] mx-auto">
        <h2 className="text-3xl font-bold text-[#1a2e26] mb-6 font-serif">Timeline</h2>

        <div className="relative inline-block mb-8">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="appearance-none bg-white border border-slate-200 rounded-lg py-2 pl-4 pr-10 text-sm text-slate-700 cursor-pointer outline-none hover:border-[#b0c8bc] transition-colors min-w-[180px] shadow-sm"
          >
            {filterOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt === "All" ? "Filter timeline" : opt}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" size={16} />
        </div>

        <div className="flex flex-col border-t border-slate-200">
          {filtered.length === 0 ? (
            <p className="py-12 text-slate-400 text-3xl text-center">No interactions yet.</p>
          ) : (
            filtered.map((item, index) => {
              const config = iconMap[item.type] || iconMap.Text;
              const Icon = config.icon;
              
              return (
                <div 
                  key={item.id ?? index} 
                  className="flex items-center gap-4 py-4 border-b border-slate-100 group hover:bg-white hover:px-2"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${config.bg}`}>
                    <Icon size={18} className={config.color} strokeWidth={2.5} />
                  </div>
                  
                  <div className="flex flex-col">
                    <p className="text-[0.9rem] text-slate-800 leading-tight">
                      <span className="font-bold">{item.type}</span>{" "}
                      <span className="text-slate-500">with {item.with}</span>
                    </p>
                    <p className="text-[0.78rem] text-slate-400 mt-0.5">{item.date}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Timeline;