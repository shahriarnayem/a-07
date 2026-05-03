import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Bell,
  Archive,
  Trash2,
  Phone,
  MessageSquare,
  Video,
  History,
  CheckCircle,
} from "lucide-react";

const ToastMessage = ({ text, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-[#19382f] px-5 py-3.5 text-white shadow-xl animate-slide-up">
      <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-300" />
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
};

const InfoCard = ({ value, label }) => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white py-6 shadow-sm">
    <span className="mb-1 text-2xl font-bold text-[#19382f]">{value}</span>
    <span className="text-xs text-slate-600">{label}</span>
  </div>
);

const ActionButton = ({ icon: Icon, label, danger }) => (
  <button
    className={`flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors ${
      danger
        ? "text-red-600 hover:bg-red-50"
        : "text-slate-700 hover:bg-slate-100"
    }`}
  >
    <Icon className="h-4 w-4" />
    {label}
  </button>
);

const FriendDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetch("/friends.json")
      .then((res) => res.json())
      .then((data) => {
        const match = data.find((item) => item.id === Number(id));
        setUser(match);
        setIsLoading(false);
      });
  }, [id]);

  const handleInteraction = (type) => {
    if (!user) return;

    const entry = {
      id: Date.now(),
      type,
      title: `${type} with ${user.name}`,
      with: user.name,
      date: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };

    const stored = JSON.parse(localStorage.getItem("kk_timeline") || "[]");
    localStorage.setItem("kk_timeline", JSON.stringify([entry, ...stored]));

    setToast({ text: `${type} with ${user.name} logged!` });
    setTimeout(() => navigate("/timeline"), 1700);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f9fbfd]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#c8ddd5] border-t-[#19382f]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f9fbfd]">
        <h2 className="text-2xl font-bold text-slate-900">Friend not found</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-[#264f42] underline"
        >
          Go back home
        </button>
      </div>
    );
  }

  const interactions = [
    { title: "Text", desc: "Asked for career advice", date: "Jan 28, 2026", icon: MessageSquare },
    { title: "Meetup", desc: "Industry conference meetup", date: "Jan 28, 2026", icon: Phone },
    { title: "Video", desc: "Catch up call", date: "Jan 28, 2026", icon: Video },
    { title: "Text", desc: "Quick check-in", date: "Jan 28, 2026", icon: Phone },
  ];

  const quickActions = [
    { label: "Call", type: "Call", icon: Phone },
    { label: "Text", type: "Text", icon: MessageSquare },
    { label: "Video", type: "Video", icon: Video },
  ];

  return (
    <>
      {toast && <ToastMessage text={toast.text} onClose={() => setToast(null)} />}

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.25s ease forwards; }
      `}</style>

      <section className="flex min-h-screen justify-center bg-[#f9fbfd] px-4 py-10 md:px-8">
        <div className="flex w-full max-w-5xl flex-col gap-6 md:flex-row">

          {/* LEFT */}
          <div className="flex w-full flex-col gap-4 md:w-[320px]">
            <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <img
                src={user.picture}
                alt={user.name}
                className="mb-4 h-24 w-24 rounded-full object-cover ring-4 ring-slate-50"
              />
              <h2 className="mb-2 text-xl font-bold text-slate-900">
                {user.name}
              </h2>

              <div className="mb-6 flex flex-col items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    user.status === "overdue"
                      ? "bg-red-500 text-white"
                      : "bg-[#19382f] text-white"
                  }`}
                >
                  {user.status}
                </span>

                <div className="flex flex-wrap justify-center gap-1">
                  {user.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#e6f4ee] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#2d7a5a]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mb-2 text-sm italic text-slate-600">
                "{user.bio}"
              </p>
              <p className="text-xs text-slate-400">Email: {user.email}</p>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm divide-y">
              <ActionButton icon={Bell} label="Snooze 2 Weeks" />
              <ActionButton icon={Archive} label="Archive" />
              <ActionButton icon={Trash2} label="Delete" danger />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-1 flex-col gap-4">

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <InfoCard value={user.days_since_contact} label="Days Since Contact" />
              <InfoCard value={user.goal} label="Goal (Days)" />
              <InfoCard
                value={new Date(user.next_due_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
                label="Next Due"
              />
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold text-[#19382f]">
                  Relationship Goal
                </h3>
                <button className="rounded border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50">
                  Edit
                </button>
              </div>
              <p className="text-sm text-slate-600">
                Connect every{" "}
                <strong className="text-slate-900">{user.goal} days</strong>
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-semibold text-[#19382f]">
                Quick Check-In
              </h3>

              <div className="flex gap-4">
                {quickActions.map(({ label, type, icon: Icon }) => (
                  <button
                    key={type}
                    onClick={() => handleInteraction(type)}
                    className="flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-slate-200 py-4 transition-all duration-150 hover:bg-[#eef8f3] hover:border-[#a8d5bc] active:scale-95"
                  >
                    <Icon className="h-5 w-5 text-slate-600" />
                    <span className="text-sm font-medium text-slate-600">
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-semibold text-[#19382f]">
                  Recent Interactions
                </h3>
                <button
                  onClick={() => navigate("/timeline")}
                  className="flex items-center gap-1.5 rounded border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                >
                  <History className="h-3.5 w-3.5" />
                  Full History
                </button>
              </div>

              <div className="flex flex-col divide-y">
                {interactions.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                    >
                      <div className="flex items-center gap-4">
                        <Icon className="h-5 w-5 text-slate-700" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {item.title}
                          </p>
                          <p className="text-xs text-slate-500">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-slate-400">
                        {item.date}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default FriendDetail;