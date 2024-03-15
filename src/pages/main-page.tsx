import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import CustomLink from '../components/custom-link';
import Header from '../components/header';
import OffersList from '../components/offers-list';
import { CITIES } from '../const';
import type { CityName } from '../types/offer';
import classNames from 'classnames';
import { useAppSelector } from '../hooks/state';
import { offersSelectors } from '../store/slices/offers';

type MainPageProps = {
  cityName: CityName;
}

function MainPage({ cityName }: MainPageProps): JSX.Element {
  const currentPath = useLocation().pathname;
  const offers = useAppSelector(offersSelectors.offers);
  const offersByCity = Object.groupBy(offers, (offer) => offer.city.name);
  const currentOffers = offersByCity[cityName] || [];

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header logoIsActive />
      <main className={classNames('page__main page__main--index', { 'page__main--index-empty': !currentOffers.length })}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {CITIES.map((city) => (
                <li key={city.slug} className="locations__item">
                  <CustomLink
                    className='locations__item-link tabs__item'
                    activeClassName='tabs__item--active'
                    currentPath={currentPath}
                    to={`/${city.slug}`}
                  >
                    <span>{city.name}</span>
                  </CustomLink>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <OffersList offers={currentOffers} cityName={cityName} />
      </main>
    </div>
  );
}

export default MainPage;
