import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full py-6 px-8 md:px-16 flex items-center justify-between relative z-50">
      
      {/* Brand / Logo - Left */}
      <div className="flex items-center group cursor-pointer select-none">
         <span className="text-2xl font-serif font-bold text-white tracking-wide">
           Sukrit Aggarwal
         </span>
      </div>

      {/* Nav Links - Right aligned */}
      <div className="hidden md:flex items-center gap-12">
        <NavLink text="ABOUT" />
        <NavLink text="PORTFOLIO" />
        <NavLink text="INSIGHTS" />
        <NavLink text="CONTACT" />
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden text-white cursor-pointer hover:text-gray-300 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{ text: string }> = ({ text }) => (
  <a href="#" className="relative text-gray-400 hover:text-white transition-colors text-xs font-sans tracking-[0.2em] uppercase font-medium group">
    {text}
    <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-white group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
  </a>
);

export default Navbar;