import { KeebLayout, Zone, Key } from './data-model';

export interface LayoutViewProps {
  layout: KeebLayout;
}

export interface ZoneViewProps {
  zone: Zone;
}

export interface KeyViewProps {
  key: Key;
}

export interface YamlViewProps {
  yaml: string;
}
