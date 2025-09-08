import { render, screen } from '@testing-library/react';
import Page from '@/app/page';

describe('Initial View', () => {
  it('should display the three options to start a new design', () => {
    render(<Page />);

    expect(screen.getByRole('heading', { name: /Split Keyboard/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Unibody/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Custom/i })).toBeInTheDocument();
  });
});