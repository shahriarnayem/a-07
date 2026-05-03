import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const STATUS_MAP = {
  overdue: {
    label: "Overdue",
    style: "bg-red-500 text-white",
  },
  "almost-due": {
    label: "Almost Due",
    style: "bg-amber-500 text-white",
  },
  "on-track": {
    label: "On Track",
    style: "bg-[#19382f] text-white",
  },
};

const FriendItem = ({ data }) => {
  const navigate = useNavigate();

  const currentStatus = STATUS_MAP[data.status] || {
    label: data.status,
    style: "bg-[#19382f] text-white",
  };

  return (
    <div
      onClick={() => navigate(`/friend/${data.id}`)}
      className="group flex flex-col items-center gap-2 rounded-[16px] bg-white p-6 pb-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
    >
      <img
        src={data.picture}
        alt={data.name}
        onError={(e) => {
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            data.name
          )}&background=19382f&color=fff`;
        }}
        className="mb-1 h-20 w-20 rounded-full object-cover ring-2 ring-gray-100 transition-all group-hover:ring-[#19382f]/10"
      />

      <h3 className="m-0 text-center text-[1rem] font-bold text-[#172923]">
        {data.name}
      </h3>

      <p className="m-0 text-[0.78rem] text-[#8aa39a]">
        {data.days_since_contact}d ago
      </p>

      <div className="flex flex-wrap justify-center gap-1.5">
        {data.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[#e6f4ee] px-2.5 py-0.5 text-[0.65rem] font-semibold tracking-wider text-[#2d7a5a]"
          >
            {tag.toUpperCase()}
          </span>
        ))}
      </div>

      <span
        className={`mt-1 rounded-full px-3.5 py-1 text-[0.72rem] font-semibold ${currentStatus.style}`}
      >
        {currentStatus.label}
      </span>
    </div>
  );
};

const Friends = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/friends.json")
      .then((res) => res.json())
      .then((data) => {
        setList(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#c8ddd5] border-t-[#19382f]" />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#eef3f7] px-6 py-10">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="mb-6 text-[1.6rem] font-serif font-bold text-[#172923]">
          Your Friends
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {list.map((item) => (
            <FriendItem key={item.id} data={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Friends;