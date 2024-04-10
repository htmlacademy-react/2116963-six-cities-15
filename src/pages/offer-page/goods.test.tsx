import { render, screen } from '@testing-library/react';
import { makeFakeFullOffer } from '../../mock/mock';
import Goods from './goods';

describe('Component: Goods', () => {
  it('should render correct', () => {
    const goods = makeFakeFullOffer().goods;

    const component = <Goods goods={goods} />;

    render(component);

    expect(screen.getByText('What’s inside')).toBeInTheDocument();
    goods.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});
