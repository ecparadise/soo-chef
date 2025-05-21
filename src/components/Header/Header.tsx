import React from 'react';
import logo from '../../images/white-logo.png';
import * as motion from "motion/react-client"

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-violet-900 to-violet-400 text-gray-50 flex items-center justify-around p-4 w-full">
      <div className="flex flex-col items-center space-y-2 row-start-1 w-full">
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          src={logo.src}
          alt="Robot chef"
          className="h-20 w-20 object-contain"
        />
        <h1 className="text-2xl font-bold">
          <span className="text-white">Soo</span>
          <span className="text-emerald-500">Chef</span>
        </h1>
        <span className="text-sm italic text-white font-semibold">Your ai-powered kitchen companion</span>
      </div>
    </header>
  );
};

export default Header;
