import { render, screen, fireEvent } from '@testing-library/react';
import { GlowEffect } from '@/components/ui/GlowEffect';

describe('GlowEffect', () => {
  test('renders children with glow effect', () => {
    render(
      <GlowEffect data-testid="glow-wrapper">
        <h1>Glowing Text</h1>
      </GlowEffect>
    );
    
    const wrapper = screen.getByTestId('glow-wrapper');
    const heading = screen.getByRole('heading', { name: 'Glowing Text' });
    
    expect(wrapper).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(wrapper).toHaveClass('glow-effect');
  });

  test('applies correct shadow based on element type', () => {
    const { rerender } = render(
      <GlowEffect element="text" data-testid="glow-wrapper">
        <h1>Text</h1>
      </GlowEffect>
    );
    
    let wrapper = screen.getByTestId('glow-wrapper');
    expect(wrapper).toHaveClass('glow-text');

    rerender(
      <GlowEffect element="button" data-testid="glow-wrapper">
        <button>Button</button>
      </GlowEffect>
    );
    
    wrapper = screen.getByTestId('glow-wrapper');
    expect(wrapper).toHaveClass('glow-button');
  });

  test('maintains accessibility contrast ratios', () => {
    render(
      <GlowEffect color="#ffffff" data-testid="glow-wrapper">
        <p>Accessible text</p>
      </GlowEffect>
    );
    
    const wrapper = screen.getByTestId('glow-wrapper');
    const text = screen.getByText('Accessible text');
    
    expect(wrapper).toBeAccessible();
    expect(text).toBeVisible();
  });

  test('supports hover state changes', () => {
    render(
      <GlowEffect intensity="medium" data-testid="glow-wrapper">
        <button>Hover me</button>
      </GlowEffect>
    );
    
    const wrapper = screen.getByTestId('glow-wrapper');
    const button = screen.getByRole('button');
    
    // Test hover state
    fireEvent.mouseEnter(button);
    expect(wrapper).toHaveClass('glow-hover');
    
    fireEvent.mouseLeave(button);
    expect(wrapper).not.toHaveClass('glow-hover');
  });

  test('validates color prop format', () => {
    const { rerender } = render(
      <GlowEffect color="#ffffff" data-testid="glow-wrapper">
        <span>Valid color</span>
      </GlowEffect>
    );
    
    let wrapper = screen.getByTestId('glow-wrapper');
    expect(wrapper).toHaveStyle('--glow-color: #ffffff');

    rerender(
      <GlowEffect color="rgb(255, 255, 255)" data-testid="glow-wrapper">
        <span>Valid RGB color</span>
      </GlowEffect>
    );
    
    wrapper = screen.getByTestId('glow-wrapper');
    expect(wrapper).toHaveStyle('--glow-color: rgb(255, 255, 255)');
  });

  test('applies intensity-based shadow configurations', () => {
    const { rerender } = render(
      <GlowEffect intensity="subtle" data-testid="glow-wrapper">
        <span>Subtle glow</span>
      </GlowEffect>
    );
    
    let wrapper = screen.getByTestId('glow-wrapper');
    expect(wrapper).toHaveClass('glow-intensity-subtle');

    rerender(
      <GlowEffect intensity="strong" data-testid="glow-wrapper">
        <span>Strong glow</span>
      </GlowEffect>
    );
    
    wrapper = screen.getByTestId('glow-wrapper');
    expect(wrapper).toHaveClass('glow-intensity-strong');
  });

  test('preserves semantic HTML structure', () => {
    render(
      <GlowEffect data-testid="glow-wrapper">
        <main>
          <h1>Main heading</h1>
          <p>Paragraph content</p>
        </main>
      </GlowEffect>
    );
    
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText('Paragraph content')).toBeInTheDocument();
  });
});