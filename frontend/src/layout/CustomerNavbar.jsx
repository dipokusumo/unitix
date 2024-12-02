import React from "react";

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-8">
        <nav className="space-x-6 flex">
          {["Dashboard", "Event", "My Event"].map((item, index) => (
            <a
              key={index}
              href="#"
              className="relative text-gray-600 hover:text-black font-medium group"
            >
              {item}
              {/* Hover Bar */}
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-black transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button className="text-gray-500">
          <i className="fas fa-bell"></i>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
