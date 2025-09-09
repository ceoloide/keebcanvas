"use client";

import { Canvas } from '@react-three/fiber';
import { useStore } from '../store/store';

const Key = ({ position }: { position: [number, number, number] }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
};

export const PreviewView = () => {
  const layout = useStore((state) => state.layout);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '400px' }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {Object.values(layout.points.zones).flatMap((zone) =>
          Object.values(zone.keys).map((key, i) => {
            const position: [number, number, number] = [i * 2, 0, 0];
            if (key.shift) {
              position[0] += key.shift[0];
              position[1] -= key.shift[1]; // y is inverted in three.js
            }
            return <Key key={i} position={position} />;
          })
        )}
      </Canvas>
    </div>
  );
};
