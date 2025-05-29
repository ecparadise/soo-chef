import React from 'react';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import lightAnimationData from './SooChef.lottie.json';
import darkAnimationData from './SooChefDark.lottie.json';

type LoaderProps = {
  isDarkMode: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isDarkMode }) => {
  return (
    <div className="flex justify-center items-center h-80 mt-auto mb-auto">
      <Lottie
        animationData={isDarkMode ? darkAnimationData : lightAnimationData}
        loop={true} // Set to true for infinite looping
        className="w-72 h-72"
      />
    </div>
  );
};

export default Loader;