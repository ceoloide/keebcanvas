"use client";

import { useStore } from '../store/store';
import { useEffect } from 'react';
import { LayoutCanvas } from './LayoutCanvas';

export const LayoutView = () => {
  const { nudgeKey, rotateKey } = useStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          nudgeKey('up');
          break;
        case 'ArrowDown':
          nudgeKey('down');
          break;
        case 'ArrowLeft':
          nudgeKey('left');
          break;
        case 'ArrowRight':
          nudgeKey('right');
          break;
        case 'r':
          rotateKey('clockwise');
          break;
        case 't':
          rotateKey('counter-clockwise');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [nudgeKey, rotateKey]);

  return (
    <div>
      <LayoutCanvas />
    </div>
  );
};
