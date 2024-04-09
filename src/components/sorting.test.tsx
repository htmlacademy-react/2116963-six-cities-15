import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SORTING_OPTIONS } from '../const';
import Sorting from './sorting';

describe('Component: Sorting', () => {
  it('should render correctly', () => {
    const currentOption = SORTING_OPTIONS[0];
    const mockFn = vi.fn();

    const component = <Sorting currentOption={currentOption} setCurrentOption={mockFn} />;

    render(component);

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    SORTING_OPTIONS.forEach((option) => {
      if (option === currentOption) {
        expect(screen.getAllByText(currentOption.text)).toHaveLength(2);
      } else {
        expect(screen.getByText(option.text)).toBeInTheDocument();
      }
    });
  });

  it('should call setCurrentOption on click on list option', async () => {
    const currentOption = SORTING_OPTIONS[0];
    const mockFn = vi.fn();

    const component = <Sorting currentOption={currentOption} setCurrentOption={mockFn} />;

    render(component);

    await userEvent.click(screen.getByText(SORTING_OPTIONS[1].text));
    expect(mockFn).toBeCalledTimes(1);
  });
});
