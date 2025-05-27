import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { IFormValues } from '../RecipeForm/RecipeForm';

interface MealTypeDropdownProps {
  options: string[];
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  register: UseFormRegister<IFormValues>;
}

const MealTypeDropdown: React.FC<MealTypeDropdownProps> = ({ options, selectedOption, setSelectedOption, register }) => {

  const onChange = (value: string) => {
    setSelectedOption(value);
  };


  return (
    <div className="flex flex-col">
      <label htmlFor="meal-type-dropdown" className="font-semibold">Meal Type</label>
      <select
        id="meal-type-dropdown"
        value={selectedOption}
        className='border-solid border-gray-300 rounded-md p-2 border-1 w-full mb-6'
        {...register('mealType')}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MealTypeDropdown;