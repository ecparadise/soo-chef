import React from 'react';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import animationData from './SooChef.lottie.json';

const LottieAnimation: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-80 mt-auto mb-auto">
      <Lottie
        animationData={animationData}
        loop={true} // Set to true for infinite looping
        className="w-72 h-72"
      />
    </div>
  );
};

export default LottieAnimation;