import React, { useState } from 'react';
import { view } from '@forge/bridge';

const CheckboxAdminPage = () => {
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState('');

  const addOption = () => {
    if (newOption.trim() !== '') {
      setOptions([...options, newOption]);
      setNewOption('');
    }
  };

  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const saveConfiguration = async () => {
    await view.submit({ options });
  };

  return (
    <div>
      <h3>Configure Checkbox Options</h3>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            {option} <button onClick={() => removeOption(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newOption}
        onChange={(e) => setNewOption(e.target.value)}
        placeholder="Enter new option"
      />
      <button onClick={addOption}>Add</button>
      <button onClick={saveConfiguration}>Save</button>
    </div>
  );
};

export default CheckboxAdminPage;
