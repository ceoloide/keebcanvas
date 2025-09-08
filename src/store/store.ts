import { create } from 'zustand';
import { KeebLayout, Zone, Key } from '../lib/types';
import { generateYaml } from '../lib/ergogen';

export interface KeebState {
  layout: KeebLayout;
  selectedKey: { zoneName: string; keyName: string } | null;
  selectedZone: string | null;
  setSelectedKey: (zoneName: string, keyName: string) => void;
  clearSelectedKey: () => void;
  setSelectedZone: (zoneName: string) => void;
  clearSelectedZone: () => void;
  setLayout: (layout: KeebLayout) => void;
  setMeta: (meta: KeebLayout['meta']) => void;
  addZone: (zoneName: string) => void;
  removeZone: (zoneName: string) => void;
  updateZone: (zoneName: string, zone: Partial<Zone>) => void;
  addKey: (zoneName: string, keyName: string) => void;
  removeKey: (zoneName: string, keyName: string) => void;
  updateKey: (zoneName: string, keyName: string, key: Partial<Key>) => void;
  nudgeKey: (direction: 'up' | 'down' | 'left' | 'right') => void;
  rotateKey: (direction: 'clockwise' | 'counter-clockwise') => void;
  generateYaml: () => string;
}

export const useStore = create<KeebState>((set, get) => ({
  layout: {
    meta: {
      name: 'My Keeb',
      author: 'Me',
    },
    points: {
      zones: {
        matrix: {
          keys: {
            key1: {},
            key2: { shift: [1, 0] },
            key3: { shift: [2, 0] },
          },
        },
      },
    },
  },
  selectedKey: null,
  selectedZone: null,
  setSelectedKey: (zoneName, keyName) => set({ selectedKey: { zoneName, keyName } }),
  clearSelectedKey: () => set({ selectedKey: null }),
  setSelectedZone: (zoneName) => set({ selectedZone: zoneName }),
  clearSelectedZone: () => set({ selectedZone: null }),
  setLayout: (layout) => set({ layout }),
  setMeta: (meta) => set((state) => ({ layout: { ...state.layout, meta } })),
  addZone: (zoneName) =>
    set((state) => ({
      layout: {
        ...state.layout,
        points: {
          ...state.layout.points,
          zones: {
            ...state.layout.points.zones,
            [zoneName]: { keys: {} },
          },
        },
      },
    })),
  removeZone: (zoneName) =>
    set((state) => {
      const { [zoneName]: _, ...zones } = state.layout.points.zones;
      return {
        layout: {
          ...state.layout,
          points: {
            ...state.layout.points,
            zones,
          },
        },
      };
    }),
  updateZone: (zoneName, zone) =>
    set((state) => ({
      layout: {
        ...state.layout,
        points: {
          ...state.layout.points,
          zones: {
            ...state.layout.points.zones,
            [zoneName]: { ...state.layout.points.zones[zoneName], ...zone },
          },
        },
      },
    })),
  addKey: (zoneName, keyName) =>
    set((state) => ({
      layout: {
        ...state.layout,
        points: {
          ...state.layout.points,
          zones: {
            ...state.layout.points.zones,
            [zoneName]: {
              ...state.layout.points.zones[zoneName],
              keys: {
                ...state.layout.points.zones[zoneName].keys,
                [keyName]: {},
              },
            },
          },
        },
      },
    })),
  removeKey: (zoneName, keyName) =>
    set((state) => {
      const { [keyName]: _, ...keys } = state.layout.points.zones[zoneName].keys;
      return {
        layout: {
          ...state.layout,
          points: {
            ...state.layout.points,
            zones: {
              ...state.layout.points.zones,
              [zoneName]: {
                ...state.layout.points.zones[zoneName],
                keys,
              },
            },
          },
        },
      };
    }),
  updateKey: (zoneName, keyName, key) =>
    set((state) => ({
      layout: {
        ...state.layout,
        points: {
          ...state.layout.points,
          zones: {
            ...state.layout.points.zones,
            [zoneName]: {
              ...state.layout.points.zones[zoneName],
              keys: {
                ...state.layout.points.zones[zoneName].keys,
                [keyName]: { ...state.layout.points.zones[zoneName].keys[keyName], ...key },
              },
            },
          },
        },
      },
    })),
  nudgeKey: (direction) => {
    set((state) => {
      const { selectedKey, layout } = state;
      if (!selectedKey) return {};

      const newLayout = JSON.parse(JSON.stringify(layout));
      const { zoneName, keyName } = selectedKey;
      const key = newLayout.points.zones[zoneName].keys[keyName];
      const shift = key.shift || [0, 0];

      switch (direction) {
        case 'up':
          key.shift = [shift[0], shift[1] - 1];
          break;
        case 'down':
          key.shift = [shift[0], shift[1] + 1];
          break;
        case 'left':
          key.shift = [shift[0] - 1, shift[1]];
          break;
        case 'right':
          key.shift = [shift[0] + 1, shift[1]];
          break;
      }

      return { layout: newLayout };
    });
  },
  rotateKey: (direction) => {
    set((state) => {
      const { selectedKey, layout } = state;
      if (!selectedKey) return {};

      const newLayout = JSON.parse(JSON.stringify(layout));
      const { zoneName, keyName } = selectedKey;
      const key = newLayout.points.zones[zoneName].keys[keyName];
      const rotate = key.rotate || 0;

      switch (direction) {
        case 'clockwise':
          key.rotate = rotate + 1;
          break;
        case 'counter-clockwise':
          key.rotate = rotate - 1;
          break;
      }

      return { layout: newLayout };
    });
  },
  generateYaml: () => generateYaml(get().layout),
}));