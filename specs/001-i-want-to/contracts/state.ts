import { KeebLayout, Zone, Key } from './data-model';

export interface KeebState {
  layout: KeebLayout;
  // Actions
  setLayout: (layout: KeebLayout) => void;
  setMeta: (meta: KeebLayout['meta']) => void;
  addZone: (zoneName: string) => void;
  removeZone: (zoneName: string) => void;
  updateZone: (zoneName: string, zone: Partial<Zone>) => void;
  addKey: (zoneName: string, keyName: string) => void;
  removeKey: (zoneName: string, keyName: string) => void;
  updateKey: (zoneName: string, keyName: string, key: Partial<Key>) => void;
  generateYaml: () => string;
}
