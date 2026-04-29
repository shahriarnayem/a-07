import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#1e4035] text-[#d4e8de]">
      <div className="max-w-[1600px] mx-auto px-6 py-12 flex flex-col items-center text-center">

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
          <span>Keen</span>
          <span className="font-semibold">Keeper</span>
        </h1>

        <p className="text-sm md:text-base text-[#a8c4b4] max-w-lg leading-relaxed mb-7">
          Your personal shelf of meaningful connections. Browse, tend, and
          nurture the relationships that matter most.
        </p>

        <div className="flex flex-col items-center gap-3">
          <p className="text-sm tracking-wide">Social Links</p>
          <div className="flex gap-3">

            <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-[#2d5a48] text-white hover:bg-[#3a7a60] hover:-translate-y-0.5 transition-all duration-200" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-[#2d5a48] text-white hover:bg-[#3a7a60] hover:-translate-y-0.5 transition-all duration-200" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-[#2d5a48] text-white hover:bg-[#3a7a60] hover:-translate-y-0.5 transition-all duration-200" aria-label="X (Twitter)">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[#2d5a48] px-6 md:px-10 py-6">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-xs text-[#7aa48e]">
            © 2025 KeenKeeper. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-[#7aa48e] hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-[#7aa48e] hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-[#7aa48e] hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;