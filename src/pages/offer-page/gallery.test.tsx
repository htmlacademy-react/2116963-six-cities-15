import { render } from '@testing-library/react';
import { makeFakeFullOffer } from '../../mock/mock';
import Gallery from './gallery';

describe('Component: Gallery', () => {
  it('should render correct', () => {
    const images = makeFakeFullOffer().images;
    const limit = 6;

    const component = <Gallery images={images} imagesLimit={limit} />;

    const {container} = render(component);

    const currentImages = container.querySelectorAll('img');
    expect(currentImages.length).toBeLessThanOrEqual(limit);
  });
});
