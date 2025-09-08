import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Page from '@/app/page';

describe('Layout Selection', () => {
  it('should allow selecting a split keyboard and a Corne layout', async () => {
    const { container } = render(<Page />);

    // Click on the "Split Keyboard" option
    await userEvent.click(screen.getByRole('heading', { name: /Split Keyboard/i }));

    // After clicking, a new view should appear with layout options
    // For now, we'll just check that the initial options are gone
    expect(screen.queryByRole('heading', { name: /Split Keyboard/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /Unibody/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /Custom/i })).not.toBeInTheDocument();

    // And a new heading for layout selection should be present
    expect(screen.getByRole('heading', { name: /Select a Layout/i })).toBeInTheDocument();

    // Click on the "Corne (crkbd)" option
    await userEvent.click(screen.getByRole('heading', { name: /Corne \(crkbd\)/i }));

    // After selecting a layout, the layout view should be displayed
    // We can check for the presence of the canvas element
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });
});