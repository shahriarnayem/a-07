import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 overflow-hidden">
      <div className="bg-white border border-slate-200 rounded-[24px] p-12 md:p-16 max-w-[520px] w-full text-center shadow-sm">

        <span className="inline-block bg-[#e6f4ee] text-[#1e4035] text-[0.7rem] font-bold tracking-[0.12em] uppercase px-3.5 py-1 rounded-full mb-6">Page not found</span>

        <p className="text-[5rem] md:text-[7rem] text-[#1e4035] m-0 mb-2 tracking-[-4px] font-bold leading-none">404</p>

        <div className="w-12 h-[3px] bg-gradient-to-r from-[#1e4035] to-[#2d7a5a] rounded-full mx-auto my-5 mb-7" />

        <h1 className="text-xl font-semibold text-slate-800 mb-3">Lost on the shelf?</h1>

        <p className="text-[0.92rem] text-slate-500 leading-[1.65] mb-9 max-w-[360px] mx-auto">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back to your connections.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <button
            className="bg-[#1e4035] text-white px-7 py-3 rounded-xl text-[0.9rem] font-semibold cursor-pointer hover:bg-[#2d5a48] active:scale-95 transition-all"
            onClick={() => navigate("/")}
          >Go Home</button> 
        </div>
      </div>
    </div>
  );
};

export default NotFound;