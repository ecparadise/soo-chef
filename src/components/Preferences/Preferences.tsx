import React from 'react';
import { preferenceOptions } from '../RecipeForm/constants';
import PreferenceButton from './PreferenceButton';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'motion/react';

interface PreferencesProps {
  selectedPreferences: string[];
  setSelectedPreferences: (preferences: string[]) => void;
}

const Preferences: React.FC<PreferencesProps> = ({ selectedPreferences, setSelectedPreferences }) => {

  const [isExpanded, setIsExpanded] = React.useState(false);
  const handlePreferenceClick = (preference: string) => {
    const newSelectedPreferences = selectedPreferences.includes(preference)
      ? selectedPreferences.filter((p) => p !== preference)
      : [...selectedPreferences, preference];
    setSelectedPreferences(newSelectedPreferences);
  };

  return (
    <div>
      <button type="button" className="flex items-center gap-1 mb-2" onClick={() => setIsExpanded(!isExpanded)}>
        <span className="font-semibold" id="preferences-label">Recipe Preferences</span>
        {isExpanded ? <ChevronUpIcon className="w-5 h-5" aria-label="collapse" aria-hidden="false" /> : <ChevronDownIcon className="w-5 h-5" aria-label="expand" aria-hidden="false" />}
      </button>
      <AnimatePresence>
        {isExpanded && <motion.div role="group" aria-labelledby="preferences-label" className="grid grid-cols-2 sm:grid-cols-4 gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}>
          {preferenceOptions.map((preference) => <PreferenceButton label={preference} key={preference} onClick={() => handlePreferenceClick(preference)} isSelected={selectedPreferences.includes(preference)} />)}
        </motion.div>}
      </AnimatePresence>
    </div>);
};

export default Preferences;