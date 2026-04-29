import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const statusConfig = {
  overdue: { label: "Overdue", className: "bg-[#ff4d4d] text-white" },
  "almost-due": { label: "Almost Due", className: "bg-[#f5a623] text-white" },
  "on-track": { label: "On-Track", className: "bg-[#1e4035] text-white" },
};

const FriendCard = ({ friend }) => {
  const navigate = useNavigate();
  const status = statusConfig[friend.status] || {
    label: friend.status,
    className: "bg-[#1e4035] text-white",
  };

  return (
    <div 
      onClick={() => navigate(`/friend/${friend.id}`)}
      className="bg-white rounded-[16px] p-6 pb-5 flex flex-col items-center gap-2 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer group">
      <img
        src={friend.picture}
        alt={friend.name}
        className="w-20 h-20 rounded-full object-cover mb-1 ring-2 ring-gray-50 group-hover:ring-[#1e4035]/10 transition-all"
        onError={(e) => {
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            friend.name
          )}&background=1e4035&color=fff`;
        }}/>
        
      <h3 className="text-[1rem] font-bold text-[#1a2e26] m-0 text-center">
        {friend.name}
      </h3>
      <p className="text-[0.78rem] text-[#8fa89e] m-0">
        {friend.days_since_contact}d ago
      </p>
      
      <div className="flex flex-wrap gap-1.5 justify-center">
        {friend.tags.map((tag) => (
          <span 
            key={tag} 
            className="bg-[#e6f4ee] text-[#2d7a5a] text-[0.65rem] font-semibold px-2.5 py-0.5 rounded-full tracking-wider"
          >
            {tag.toUpperCase()}
          </span>
        ))}
      </div>
      
      <span className={`text-[0.72rem] font-semibold px-3.5 py-1 rounded-full mt-1 ${status.className}`}>
        {status.label}
      </span>
    </div>
  );
};

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/friends.json")
      .then((res) => res.json())
      .then((data) => {
        setFriends(data);
        setLoading(false);
      })
      .catch(() => {

        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#c8ddd5] border-t-[#1e4035] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="bg-[#f0f4f8] min-h-screen px-6 py-10">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="text-[1.6rem] font-bold text-[#1a2e26] mb-6 font-serif">
          Your Friends
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {friends.map((friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Friends;