import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Bell, Archive, Trash2, Phone, MessageSquare, Video, History, CheckCircle,
} from "lucide-react";

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#1e4035] text-white px-5 py-3.5 rounded-xl shadow-xl animate-slide-up">
      <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

const FriendDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetch("/friends.json")
      .then((res) => res.json())
      .then((data) => {
        const foundFriend = data.find((f) => f.id === parseInt(id));
        setFriend(foundFriend);
        setLoading(false);
      })}, [id]);

  const handleCheckIn = (type) => {
    if (!friend) return;

    const newEntry = {
      id: Date.now(),
      type,
      title: `${type} with ${friend.name}`,
      with: friend.name,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    const existing = JSON.parse(localStorage.getItem("kk_timeline") || "[]");
    localStorage.setItem("kk_timeline", JSON.stringify([newEntry, ...existing]));

    setToast({ message: `${type} with ${friend.name} logged!` });
    setTimeout(() => navigate("/timeline"), 1800);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f8fafc]">
        <div className="w-10 h-10 border-4 border-[#c8ddd5] border-t-[#1e4035] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!friend) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
        <h2 className="text-2xl font-bold text-slate-800">Friend not found</h2>
        <button onClick={() => navigate("/")} className="mt-4 text-[#2b5a4a] underline">
          Go back home
        </button>
      </div>
    );
  }

  const recentInteractions = [
    { title: "Text", desc: "Asked for career advice", date: "Jan 28, 2026", icon: MessageSquare },
    { title: "Meetup", desc: "Industry conference meetup", date: "Jan 28, 2026", icon: Phone },
    { title: "Video", desc: "Asked for career advice", date: "Jan 28, 2026", icon: Video },
    { title: "Text", desc: "Asked for career advice", date: "Jan 28, 2026", icon: Phone },
  ];

  const checkInButtons = [
    { label: "Call", type: "Call", Icon: Phone },
    { label: "Text", type: "Text", Icon: MessageSquare },
    { label: "Video", type: "Video", Icon: Video },
  ];

  return (
    <>
      {toast && <Toast message={toast.message} onClose={() => setToast(null)} />}

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.3s ease forwards; }
      `}</style>

      <section className="bg-[#f8fafc] min-h-screen py-10 px-4 md:px-8 flex justify-center">
        <div className="max-w-5xl w-full flex flex-col md:flex-row gap-6">

          <div className="w-full md:w-[320px] flex flex-col gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-8 flex flex-col items-center text-center shadow-sm">
              <img
                src={friend.picture}
                alt={friend.name}
                className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-slate-50"
              />
              <h2 className="text-xl font-bold text-slate-800 mb-2">{friend.name}</h2>
              <div className="flex flex-col gap-2 items-center mb-6">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                  friend.status === "overdue" ? "bg-[#ff4d4d] text-white" : "bg-[#1e4035] text-white"
                }`}>
                  {friend.status}
                </span>
                <div className="flex gap-1 flex-wrap justify-center">
                  {friend.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#e6f4ee] text-[#2d7a5a]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-slate-500 italic mb-2">"{friend.bio}"</p>
              <p className="text-xs text-slate-400">Email:- {friend.email}</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl flex flex-col divide-y divide-slate-100 shadow-sm overflow-hidden">
              <button className="flex items-center justify-center gap-2 py-4 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <Bell className="w-4 h-4" /> Snooze 2 Weeks
              </button>
              <button className="flex items-center justify-center gap-2 py-4 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <Archive className="w-4 h-4" /> Archive
              </button>
              <button className="flex items-center justify-center gap-2 py-4 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4">

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl py-6 flex flex-col items-center justify-center shadow-sm">
                <span className="text-2xl font-bold text-[#1e4035] mb-1">{friend.days_since_contact}</span>
                <span className="text-xs text-slate-500">Days Since Contact</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl py-6 flex flex-col items-center justify-center shadow-sm">
                <span className="text-2xl font-bold text-[#1e4035] mb-1">{friend.goal}</span>
                <span className="text-xs text-slate-500">Goal (Days)</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl py-6 flex flex-col items-center justify-center shadow-sm">
                <span className="text-xl font-bold text-[#1e4035] mb-1">
                  {new Date(friend.next_due_date).toLocaleDateString("en-US", {
                    month: "short", day: "numeric", year: "numeric",
                  })}
                </span>
                <span className="text-xs text-slate-500">Next Due</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-[#1e4035]">Relationship Goal</h3>
                <button className="text-xs border border-slate-200 px-3 py-1 rounded text-slate-600 hover:bg-slate-50 font-medium">Edit</button>
              </div>
              <p className="text-sm text-slate-600">
                Connect every <strong className="text-slate-800">{friend.goal} days</strong>
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-[#1e4035] mb-4">Quick Check-In</h3>
              <div className="flex gap-4">
                {checkInButtons.map(({ label, type, Icon }) => (
                  <button
                    key={type}
                    onClick={() => handleCheckIn(type)}
                    className="flex-1 flex flex-col items-center justify-center gap-2 border border-slate-200 rounded-lg py-4 hover:bg-[#f0f9f4] hover:border-[#a8d5bc] active:scale-95 transition-all duration-150"
                  >
                    <Icon className="w-5 h-5 text-slate-600" />
                    <span className="text-sm text-slate-600 font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-[#1e4035]">Recent Interactions</h3>
                <button
                  onClick={() => navigate("/timeline")}
                  className="text-xs border border-slate-200 px-3 py-1.5 rounded text-slate-600 hover:bg-slate-50 font-medium flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5" />Full History</button>
              </div>
              <div className="flex flex-col divide-y divide-slate-100">
                {recentInteractions.map((interaction, index) => {
                  const Icon = interaction.icon;
                  return (
                    <div key={index} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <div className="text-slate-700">
                          <Icon className="w-5 h-5" strokeWidth={2} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{interaction.title}</p>
                          <p className="text-xs text-slate-500">{interaction.desc}</p>
                        </div>
                      </div>
                      <span className="text-xs text-slate-400 font-medium">{interaction.date}</span>
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