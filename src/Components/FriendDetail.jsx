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

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#1e4035] text-white px-5 py-3.5 rounded-xl shadow-xl animate-slide-up">
      <CheckCircle className="w-5 h-5 text-green-300" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

const InfoCard = ({ value, label }) => (
  <div className="bg-white border border-gray-200 rounded-xl py-6 flex flex-col items-center justify-center shadow-sm">
    <span className="text-2xl font-bold text-[#1e4035] mb-1">{value}</span>
    <span className="text-xs text-gray-500">{label}</span>
  </div>
);

const getIcon = (type) => {
  switch (type) {
    case "Text":
      return MessageSquare;
    case "Call":
      return Phone;
    case "Video":
      return Video;
    default:
      return MessageSquare;
  }
};

const FriendDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    fetch("/friends.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((f) => f.id === parseInt(id));
        setFriend(found);
        setLoading(false);
      });

    const stored = JSON.parse(localStorage.getItem("kk_timeline") || "[]");
    setRecent(stored.slice(0, 4));
  }, [id]);

  const handleCheckIn = (type) => {
    if (!friend) return;

    const newEntry = {
      id: Date.now(),
      type,
      with: friend.name,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };

    const existing = JSON.parse(localStorage.getItem("kk_timeline") || "[]");
    const updated = [newEntry, ...existing];

    localStorage.setItem("kk_timeline", JSON.stringify(updated));
    setRecent(updated.slice(0, 4));

    setToast({ message: `${type} with ${friend.name} logged!` });
    setTimeout(() => navigate("/timeline"), 1800);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f8fafc]">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-[#1e4035] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!friend) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
        <h2 className="text-2xl font-bold text-gray-900">Friend not found</h2>
        <button onClick={() => navigate("/")} className="mt-4 text-[#2b5a4a] underline">
          Go back home
        </button>
      </div>
    );
  }

  const actions = [
    { label: "Call", type: "Call", Icon: Phone },
    { label: "Text", type: "Text", Icon: MessageSquare },
    { label: "Video", type: "Video", Icon: Video },
  ];

  return (
    <>
      {toast && <Toast message={toast.message} onClose={() => setToast(null)} />}

      <section className="bg-[#f8fafc] min-h-screen py-10 px-4 md:px-8 flex justify-center">
        <div className="max-w-5xl w-full flex flex-col md:flex-row gap-6">

          <div className="w-full md:w-[320px] flex flex-col gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-8 flex flex-col items-center text-center shadow-sm">
              <img src={friend.picture} alt={friend.name} className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-gray-100" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">{friend.name}</h2>

              <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${
                friend.status === "overdue" ? "bg-red-500 text-white" : "bg-[#1e4035] text-white"
              }`}>
                {friend.status}
              </span>

              <div className="flex gap-1 flex-wrap justify-center mt-2 mb-4">
                {friend.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#e6f4ee] text-[#2d7a5a]">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-sm text-gray-500 italic mb-2">"{friend.bio}"</p>
              <p className="text-xs text-gray-400">Email: {friend.email}</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-1 flex flex-col gap-1 shadow-sm">
              <button className="flex items-center justify-center gap-2 py-3 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
                <Bell className="w-4 h-4" /> Snooze 2 Weeks
              </button>
              <button className="flex items-center justify-center gap-2 py-3 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
                <Archive className="w-4 h-4" /> Archive
              </button>
              <button className="flex items-center justify-center gap-2 py-3 rounded-lg text-sm text-red-600 hover:bg-red-50">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4">

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <InfoCard value={friend.days_since_contact} label="Days Since Contact" />
              <InfoCard value={friend.goal} label="Goal (Days)" />
              <InfoCard value={new Date(friend.next_due_date).toLocaleDateString()} label="Next Due" />
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold text-[#1e4035]">Relationship Goal</h3>
                <button className="text-xs border px-3 py-1 rounded text-gray-600 hover:bg-gray-50">Edit</button>
              </div>
              <p className="text-sm text-gray-600">
                Connect every <strong>{friend.goal} days</strong>
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-[#1e4035] mb-4">Quick Check-In</h3>
              <div className="flex gap-4">
                {actions.map(({ label, type, Icon }) => (
                  <button
                    key={type}
                    onClick={() => handleCheckIn(type)}
                    className="flex-1 flex flex-col items-center justify-center gap-2 border rounded-lg py-4 hover:bg-[#f0f9f4]"
                  >
                    <Icon className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-700">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between mb-6">
                <h3 className="font-semibold text-[#1e4035]">Recent Interactions</h3>
                <button onClick={() => navigate("/timeline")} className="text-xs flex items-center gap-1 text-gray-600">
                  <History className="w-3.5 h-3.5" /> Full History
                </button>
              </div>

              <div className="flex flex-col divide-y">
                {recent.length === 0 ? (
                  <p className="py-6 text-center text-sm text-gray-400">
                    No recent interactions
                  </p>
                ) : (
                  recent.map((item) => {
                    const Icon = getIcon(item.type);
                    return (
                      <div key={item.id} className="flex justify-between items-center py-4">
                        <div className="flex items-center gap-4">
                          <Icon className="w-5 h-5 text-gray-700" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{item.type}</p>
                            <p className="text-xs text-gray-500">with {item.with}</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">{item.date}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default FriendDetail;