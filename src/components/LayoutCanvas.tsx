"use client";

import { useEffect, useRef } from 'react';
import { useStore } from '../store/store';
import { KeebLayout } from '../lib/types';

const KEY_WIDTH = 50;
const KEY_HEIGHT = 50;
const KEY_PADDING = 10;

const drawLayout = (
  ctx: CanvasRenderingContext2D,
  layout: KeebLayout,
  selectedKey: { zoneName: string; keyName: string } | null
) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.font = '12px sans-serif';

  let x = KEY_PADDING;
  let y = KEY_PADDING;

  Object.entries(layout.points.zones).forEach(([zoneName, zone]) => {
    ctx.fillStyle = 'black';
    ctx.fillText(zoneName, x, y);
    y += 20;

    Object.entries(zone.keys).forEach(([keyName, key]) => {
      const keyX = x + (key.shift?.[0] || 0) * (KEY_WIDTH + KEY_PADDING);
      const keyY = y + (key.shift?.[1] || 0) * (KEY_HEIGHT + KEY_PADDING);

      const isSelected =
        selectedKey?.zoneName === zoneName && selectedKey?.keyName === keyName;

      ctx.strokeStyle = isSelected ? 'blue' : 'black';
      ctx.lineWidth = isSelected ? 2 : 1;
      ctx.strokeRect(keyX, keyY, KEY_WIDTH, KEY_HEIGHT);

      ctx.fillStyle = 'black';
      ctx.fillText(keyName, keyX + 5, keyY + 20);
    });

    y += KEY_HEIGHT + KEY_PADDING;
  });
};

export const LayoutCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { layout, selectedKey, setSelectedKey } = useStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    drawLayout(context, layout, selectedKey);
  }, [layout, selectedKey]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // A simple hit detection
    let currentY = KEY_PADDING;
    for (const [zoneName, zone] of Object.entries(layout.points.zones)) {
      currentY += 20;
      for (const [keyName, key] of Object.entries(zone.keys)) {
        const keyX =
          KEY_PADDING + (key.shift?.[0] || 0) * (KEY_WIDTH + KEY_PADDING);
        const keyY =
          currentY + (key.shift?.[1] || 0) * (KEY_HEIGHT + KEY_PADDING);

        if (
          x >= keyX &&
          x <= keyX + KEY_WIDTH &&
          y >= keyY &&
          y <= keyY + KEY_HEIGHT
        ) {
          setSelectedKey(zoneName, keyName);
          return;
        }
      }
      currentY += KEY_HEIGHT + KEY_PADDING;
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      onClick={handleClick}
      style={{ border: '1px solid black' }}
    />
  );
};
