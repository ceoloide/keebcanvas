import { KeebLayout } from '../../src/lib/types';
import { generateYaml } from '../../src/lib/ergogen';

describe('Ergogen Data Transformation', () => {
  it('should generate a valid YAML string from a KeebLayout object', () => {
    const layout: KeebLayout = {
      meta: {
        name: 'My Keeb',
        author: 'Me',
      },
      points: {
        zones: {
          matrix: {
            keys: {},
          },
        },
      },
    };

    const expectedYaml = `meta:
  name: My Keeb
  author: Me
points:
  zones:
    matrix:
      keys: {}
`;

    const actualYaml = generateYaml(layout);
    expect(actualYaml).toEqual(expectedYaml);
  });
});