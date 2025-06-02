import React from 'react';
import { preferenceOptions } from '../RecipeForm/constants';
import PreferenceButton from './PreferenceButton';

interface PreferencesProps {
  selectedPreferences: string[];
  setSelectedPreferences: (preferences: string[]) => void;
}

const Preferences: React.FC<PreferencesProps> = ({ selectedPreferences, setSelectedPreferences }) => {

  const handlePreferenceClick = (preference: string) => {
    const newSelectedPreferences = selectedPreferences.includes(preference)
      ? selectedPreferences.filter((p) => p !== preference)
      : [...selectedPreferences, preference];
    setSelectedPreferences(newSelectedPreferences);
  };

  return (
    <div>
      <span className="font-semibold" id="preferences-label">Preferences</span>
      <div role="group" aria-labelledby="preferences-label" className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {preferenceOptions.map((preference) => <PreferenceButton label={preference} key={preference} onClick={() => handlePreferenceClick(preference)} isSelected={selectedPreferences.includes(preference)} />)}
      </div>
    </div>);
};

export default Preferences;