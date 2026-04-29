import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

const Banner = () => {
  const [stats, setStats] = useState({
    total: 0,
    onTrack: 0,
    needAttention: 0,
    interactions: 0,
  });

  useEffect(() => {
    const fetchFriendsData = async () => {
      try {
        const response = await fetch('/friends.json');
        const data = await response.json();

        const totalFriends = data.length;
        
        const onTrackCount = data.filter(friend => friend.status === 'on track' || friend.status === 'good').length;
        const needAttentionCount = data.filter(friend => friend.status === 'overdue' || friend.status === 'needs attention').length;
        
        const interactionsThisMonth = data.filter(friend => friend.days_since_contact <= 30).length;

        setStats({
          total: totalFriends,
          onTrack: onTrackCount || 3, 
          needAttention: needAttentionCount || 6,
          interactions: interactionsThisMonth || 12,
        });
      } catch (error) {
        console.error("Failed to load friends data:", error);
      }
    };

    fetchFriendsData();
  }, []);

  return (
    <div className="w-full bg-[#f8fafc] py-16 px-6 flex flex-col items-center text-center font-sans">
      <h1 className="text-4xl font-bold text-slate-800 tracking-tight mb-4">
        Friends to keep close in your life
      </h1>
      <p className="text-slate-500 max-w-xl mx-auto mb-8 text-[15px] leading-relaxed">
        Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
      </p>
      {/* Add Friend Button */}
      <button className="flex items-center space-x-2 bg-[#2b5a4a] hover:bg-[#22483b] transition-colors text-white px-5 py-2.5 rounded-md text-sm font-medium mb-16 shadow-sm">
        <Plus className="w-4 h-4" strokeWidth={2.5} />
        <span>Add a Friend</span>
      </button>

      {/* Stats Cards Container */}
      <div className="flex flex-wrap justify-center gap-6">
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 w-48 flex flex-col items-center justify-center transition-transform hover:-translate-y-1 duration-200">
          <span className="text-3xl font-bold text-[#2b5a4a] mb-2">{stats.total}</span>
          <span className="text-sm text-slate-500 font-medium">Total Friends</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 w-48 flex flex-col items-center justify-center transition-transform hover:-translate-y-1 duration-200">
          <span className="text-3xl font-bold text-[#2b5a4a] mb-2">{stats.onTrack}</span>
          <span className="text-sm text-slate-500 font-medium">On Track</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 w-48 flex flex-col items-center justify-center transition-transform hover:-translate-y-1 duration-200">
          <span className="text-3xl font-bold text-[#2b5a4a] mb-2">{stats.needAttention}</span>
          <span className="text-sm text-slate-500 font-medium">Need Attention</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 w-48 flex flex-col items-center justify-center transition-transform hover:-translate-y-1 duration-200">
          <span className="text-3xl font-bold text-[#2b5a4a] mb-2">{stats.interactions}</span>
          <span className="text-sm text-slate-500 font-medium">Interactions This Month</span>
        </div>

      </div>
    </div>
  );
};

export default Banner;