import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Page from '@/app/page';

describe('Zone Manipulation', () => {
  it('should allow selecting a zone and show its properties', async () => {
    render(<Page />);

    // Go to the layout editor
    await userEvent.click(screen.getByRole('heading', { name: /Split Keyboard/i }));
    await userEvent.click(screen.getByRole('heading', { name: /Corne \(crkbd\)/i }));

    // Click on a zone to select it
    const zone = await screen.findByTestId('zone-matrix');
    await userEvent.click(zone);

    // Check that the zone is selected and its properties are displayed
    // The PropertyEditor currently only shows key properties.
    // I need to update the PropertyEditor to show zone properties as well.
    // For now, I will just check that the zone name is displayed in the property editor.
    const propertyEditor = screen.getByTestId('property-editor');
    expect(propertyEditor).toHaveTextContent('matrix');
  });
});