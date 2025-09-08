import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { KeebState } from '../../src/store/store';
import { YamlDownloadButton } from '../../src/components/YamlDownloadButton';

describe('Download YAML Feature', () => {
  it('should download a YAML file when the download button is clicked', () => {
    const mockGenerateYaml = jest.fn(() => 'mock yaml content');
    const useStore = (selector: (state: KeebState) => any) => {
      const state: KeebState = {
        layout: {
          points: {
            zones: {},
          },
        },
        generateYaml: mockGenerateYaml,
        // other state properties and actions...
      } as KeebState;
      return selector(state);
    };

    const { getByText } = render(<YamlDownloadButton useStore={useStore as any} />);
    const downloadButton = getByText('Download YAML');

    const createObjectURL = jest.fn();
    const revokeObjectURL = jest.fn();
    global.URL.createObjectURL = createObjectURL;
    global.URL.revokeObjectURL = revokeObjectURL;

    const link = {
      href: '',
      download: '',
      click: jest.fn(),
    };

    const appendChild = jest.spyOn(document.body, 'appendChild').mockImplementation(() => link as any);
    const removeChild = jest.spyOn(document.body, 'removeChild').mockImplementation(() => link as any);

    fireEvent.click(downloadButton);

    expect(mockGenerateYaml).toHaveBeenCalled();
    expect(createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
    expect(appendChild).toHaveBeenCalled();
    expect(removeChild).toHaveBeenCalled();

    appendChild.mockRestore();
    removeChild.mockRestore();
  });
});
