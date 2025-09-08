import { useStore } from '../../src/store/store';

describe('Zustand Store', () => {
  beforeEach(() => {
    // Reset the store before each test
    useStore.setState({
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
      setSelectedKey: (zoneName, keyName) => useStore.setState({ selectedKey: { zoneName, keyName } }),
      clearSelectedKey: () => useStore.setState({ selectedKey: null }),
      // Mock other functions as needed for these tests
      setLayout: () => {},
      setMeta: () => {},
      addZone: () => {},
      removeZone: () => {},
      updateZone: () => {},
      addKey: () => {},
      removeKey: () => {},
      updateKey: () => {},
      nudgeKey: () => {},
      rotateKey: () => {},
      generateYaml: () => 'yaml',
    });
  });

  it('should set the selected key', () => {
    const { setSelectedKey } = useStore.getState();
    setSelectedKey('matrix', 'key1');
    const state = useStore.getState();
    expect(state.selectedKey).toEqual({ zoneName: 'matrix', keyName: 'key1' });
  });

  it('should clear the selected key', () => {
    const { setSelectedKey, clearSelectedKey } = useStore.getState();
    setSelectedKey('matrix', 'key1');
    clearSelectedKey();
    const state = useStore.getState();
    expect(state.selectedKey).toBeNull();
  });
});