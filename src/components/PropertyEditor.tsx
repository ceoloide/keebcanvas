"use client";

import { useStore } from '../store/store';

export const PropertyEditor = () => {
  const { selectedKey, layout, updateKey } = useStore();

  if (!selectedKey) {
    return <div>No key selected</div>;
  }

  const { zoneName, keyName } = selectedKey;
  const key = layout.points.zones[zoneName].keys[keyName];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateKey(zoneName, keyName, { [name]: value });
  };

  return (
    <div>
      <h3>{keyName}</h3>
      {Object.entries(key).map(([propName, propValue]) => (
        <div key={propName}>
          <label>{propName}</label>
          <input
            type="text"
            name={propName}
            value={String(propValue)}
            onChange={handleInputChange}
          />
        </div>
      ))}
    </div>
  );
};
