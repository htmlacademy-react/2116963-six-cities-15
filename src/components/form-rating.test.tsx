import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { makeFakeStore } from '../mock/mock';
import { withHistory, withStore } from '../mock/mock-component';
import FormRating from './form-rating';


describe('Component: FormRating', () => {
  it('should render correctly and check on click', async () => {
    const componentWithHistory = withHistory(<FormRating />);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore());

    render(withStoreComponent);

    const radioList = screen.getAllByRole('radio');

    expect(radioList).toHaveLength(5);
    radioList.forEach((item) => {
      expect(item).not.toBeDisabled();
    });

    await userEvent.click(radioList[0]);

    expect(radioList[0]).toBeChecked();
  });

  it('should render correctly when disabled and not to check', async () => {
    const componentWithHistory = withHistory(<FormRating isDisabled />);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore());

    render(withStoreComponent);

    const radioList = screen.getAllByRole('radio');

    expect(radioList).toHaveLength(5);
    radioList.forEach((item) => {
      expect(item).toBeDisabled();
    });

    await userEvent.click(radioList[0]);

    expect(radioList[0]).not.toBeChecked();
  });
});
