"use client";

import { Key } from '../lib/types';
import { useStore } from '../store/store';

export const KeyView = ({ zoneName, keyName, keyData }: { zoneName: string; keyName: string; keyData: Key }) => {
  const { selectedKey, setSelectedKey } = useStore();
  const isSelected = selectedKey?.zoneName === zoneName && selectedKey?.keyName === keyName;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedKey(zoneName, keyName);
  };

  return (
    <div
      onClick={handleClick}
      data-testid={`key-${keyName}`}
      style={{
        border: isSelected ? '2px solid blue' : '1px solid black',
        padding: '10px',
        margin: '5px',
        cursor: 'pointer',
      }}
    >
      <p>{keyName}</p>
    </div>
  );
};
