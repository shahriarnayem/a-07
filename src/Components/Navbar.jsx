import React, { useState } from "react";
import { Home, Clock, LineChart, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const currentRoute = useLocation();

  const navigationItems = [
    { label: "Home", url: "/", icon: Home },
    { label: "Timeline", url: "/timeline", icon: Clock },
    { label: "Stats", url: "/stats", icon: LineChart },
  ];

  const NavItems = ({ isMobile = false }) => {
    return (
      <>
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const active = currentRoute.pathname === item.url;

          return (
            <Link
              key={item.label}
              to={item.url}
              onClick={() => isMobile && setMenuOpen(false)}
              className={`
                flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200
                ${isMobile ? "w-full justify-start" : ""}
                ${
                  active
                    ? "bg-[#264f42] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }
              `}
            >
              <IconComponent
                className="h-[18px] w-[18px]"
                strokeWidth={active ? 2.4 : 1.8}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </>
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          <Link
            to="/"
            className="flex items-center cursor-pointer select-none text-xl"
          >
            <span className="font-extrabold tracking-tight text-slate-900">
              Keen
            </span>
            <span className="font-semibold tracking-tight text-[#264f42]">
              Keeper
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <NavItems />
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-md p-2 text-slate-700 hover:bg-slate-100 focus:outline-none"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-gray-200 bg-white
          ${menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="space-y-1 px-4 pt-2 pb-4">
          <NavItems isMobile={true} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;