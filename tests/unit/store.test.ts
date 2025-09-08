import { useStore } from '../../src/store/store'; // This file doesn't exist yet
import { AppState } from '../../src/lib/types';

// Mock initial state for testing
const initialState: AppState = {
  layout: {
    points: {
      zones: {
        matrix: {
          name: 'matrix',
          keys: [{ id: 'key1', x: 0, y: 0, rotate: 0 }],
        },
      },
    },
  },
  uiState: {
    selectedKeyIds: [],
    selectedZoneNames: [],
  },
};

describe('Zustand Store', () => {
  beforeEach(() => {
    // Reset the store before each test
    useStore.setState(initialState);
  });

  it('should update a key', () => {
    const { updateKey } = useStore.getState();
    updateKey('matrix', 0, { rotate: 45 });
    const state = useStore.getState();
    expect(state.layout.points.zones.matrix.keys[0].rotate).toBe(45);
  });

  it('should select a key', () => {
    const { selectKeys } = useStore.getState();
    selectKeys(['key1']);
    const state = useStore.getState();
    expect(state.uiState.selectedKeyIds).toEqual(['key1']);
  });

  it('should deselect all keys', () => {
    const { selectKeys, deselectAll } = useStore.getState();
    selectKeys(['key1']);
    deselectAll();
    const state = useStore.getState();
    expect(state.uiState.selectedKeyIds).toEqual([]);
  });
});
