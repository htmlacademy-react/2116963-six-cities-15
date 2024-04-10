import { render, screen } from '@testing-library/react';
import { makeFakeFullOffer } from '../../mock/mock';
import Features from './features';

describe('Component: Features', () => {
  it('should render correct', () => {
    const offer = {...makeFakeFullOffer(), bedrooms: 10, maxAdults: 10};

    const component = <Features offer={offer} />;

    render(component);


    expect(screen.getByText(`${offer.bedrooms} Bedroom${offer.bedrooms > 1 ? 's' : ''}`)).toBeInTheDocument();
    expect(screen.getByText(`Max ${offer.maxAdults} adult${offer.maxAdults > 1 ? 's' : ''}`)).toBeInTheDocument();
  });

  it('should render correct with 1 value', () => {
    const offer = {...makeFakeFullOffer(), bedrooms: 1, maxAdults: 1};

    const component = <Features offer={offer} />;

    render(component);


    expect(screen.getByText(`${offer.bedrooms} Bedroom${offer.bedrooms > 1 ? 's' : ''}`)).toBeInTheDocument();
    expect(screen.getByText(`Max ${offer.maxAdults} adult${offer.maxAdults > 1 ? 's' : ''}`)).toBeInTheDocument();
  });
});
