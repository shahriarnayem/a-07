import React, { useState } from 'react';
import { Home, Clock, LineChart, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Timeline', path: '/timeline', icon: Clock },
    { name: 'Stats', path: '/stats', icon: LineChart },
  ];

  const NavButtons = ({ mobile = false }) => (
    <>
      {navLinks.map((link) => {
        const Icon = link.icon;
        const isActive = location.pathname === link.path;

        return (
          <Link
            key={link.name}
            to={link.path}
            onClick={() => { if (mobile) setIsOpen(false); }}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              mobile ? 'w-full justify-start' : ''
            } ${
              isActive
                ? 'bg-[#2b5a4a] text-white shadow-md'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Icon className="w-[18px] h-[18px]" strokeWidth={isActive ? 2.5 : 2} />
            <span>{link.name}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <Link to="/" className="flex items-center text-xl cursor-pointer select-none">
            <span className="font-extrabold text-slate-800 tracking-tight">Keen</span>
            <span className="font-semibold text-[#2b5a4a] tracking-tight">Keeper</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <NavButtons></NavButtons>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-600 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-b border-gray-100 ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1">
          <NavButtons mobile={true}></NavButtons>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;