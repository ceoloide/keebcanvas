import React from 'react';

interface LayoutSelectionViewProps {
  onSelectLayout: (layoutName: string) => void;
}

export const LayoutSelectionView: React.FC<LayoutSelectionViewProps> = ({ onSelectLayout }) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">Select a Layout</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 border rounded-lg cursor-pointer" onClick={() => onSelectLayout('corne')}>
          <h2 className="text-2xl font-bold mb-4">Corne (crkbd)</h2>
          <p>A popular split keyboard with 6 columns and 3 rows.</p>
        </div>
      </div>
    </div>
  );
};