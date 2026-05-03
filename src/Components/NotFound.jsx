import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 p-6">
      
      <div className="w-full max-w-[520px] rounded-[24px] border border-slate-200 bg-white p-12 text-center shadow-sm md:p-16">

        <span className="mb-6 inline-block rounded-full bg-[#e6f4ee] px-3.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[#19382f]">
          Page not found
        </span>

        <p className="mb-2 text-[5rem] font-bold leading-none tracking-[-4px] text-[#19382f] md:text-[7rem]">
          404
        </p>

        <div className="mx-auto my-5 mb-7 h-[3px] w-12 rounded-full bg-gradient-to-r from-[#19382f] to-[#2d7a5a]" />

        <h1 className="mb-3 text-xl font-semibold text-slate-900">
          Lost on the shelf?
        </h1>

        <p className="mx-auto mb-9 max-w-[360px] text-[0.92rem] leading-[1.65] text-slate-600">
          The page you're looking for doesn’t exist or may have been moved.
          Let’s get you back to your connections.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="rounded-xl bg-[#19382f] px-7 py-3 text-[0.9rem] font-semibold text-white transition-all hover:bg-[#2a5c4b] active:scale-95"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;