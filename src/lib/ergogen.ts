import { KeebLayout } from './types';
import yaml from 'js-yaml';

export function generateYaml(layout: KeebLayout): string {
  return yaml.dump(layout);
}
