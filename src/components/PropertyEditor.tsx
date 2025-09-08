"use client";

import { useStore } from '../store/store';

export const PropertyEditor = () => {
  const {
    selectedKey,
    selectedZone,
    layout,
    updateKey,
    nudgeKey,
    rotateKey,
    updateZone,
  } = useStore();

  if (selectedKey) {
    const { zoneName, keyName } = selectedKey;
    const key = layout.points.zones[zoneName].keys[keyName];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      updateKey(zoneName, keyName, { [name]: value });
    };

    return (
      <div data-testid="property-editor">
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
        <div>
          <button onClick={() => nudgeKey('up')}>Nudge Up</button>
          <button onClick={() => nudgeKey('down')}>Nudge Down</button>
          <button onClick={() => nudgeKey('left')}>Nudge Left</button>
          <button onClick={() => nudgeKey('right')}>Nudge Right</button>
        </div>
        <div>
          <button onClick={() => rotateKey('clockwise')}>Rotate CW</button>
          <button onClick={() => rotateKey('counter-clockwise')}>Rotate CCW</button>
        </div>
      </div>
    );
  }

  if (selectedZone) {
    const zone = layout.points.zones[selectedZone];
    const handleZoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      updateZone(selectedZone, { [name]: value });
    };

    return (
      <div data-testid="property-editor">
        <h3>{selectedZone}</h3>
        {Object.entries(zone).map(([propName, propValue]) => (
          <div key={propName}>
            <label>{propName}</label>
            <input
              type="text"
              name={propName}
              value={String(propValue)}
              onChange={handleZoneInputChange}
            />
          </div>
        ))}
      </div>
    );
  }

  return <div>No item selected</div>;
};
