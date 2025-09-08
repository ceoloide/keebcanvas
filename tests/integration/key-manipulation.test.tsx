import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Page from '@/app/page';

describe('Key Manipulation', () => {
  it('should allow selecting a key and show its properties', async () => {
    render(<Page />);

    // Go to the layout editor
    await userEvent.click(screen.getByRole('heading', { name: /Split Keyboard/i }));
    await userEvent.click(screen.getByRole('heading', { name: /Corne \(crkbd\)/i }));

    // Click on a key to select it
    const key = await screen.findByTestId('key-key1');
    await userEvent.click(key);

    // Check that the key is selected and its properties are displayed
    const propertyEditor = screen.getByTestId('property-editor');
    expect(propertyEditor).toHaveTextContent('key1');
  });

  it('should have nudge buttons in the property editor', async () => {
    render(<Page />);

    // Go to the layout editor
    await userEvent.click(screen.getByRole('heading', { name: /Split Keyboard/i }));
    await userEvent.click(screen.getByRole('heading', { name: /Corne \(crkbd\)/i }));

    // Click on a key to select it
    const key = await screen.findByTestId('key-key1');
    await userEvent.click(key);

    // Check for the nudge buttons
    expect(screen.getByRole('button', { name: /Nudge Up/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Nudge Down/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Nudge Left/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Nudge Right/i })).toBeInTheDocument();
  });
});
