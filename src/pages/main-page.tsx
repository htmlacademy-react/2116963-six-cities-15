import Header from '../components/header';
import { Helmet } from 'react-helmet-async';
import type { Offer } from '../types/offer';
import OffersList from '../components/offers-list';
import { CITIES } from '../const';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import type { CityName } from '../types/offer';

type MainPageProps = {
  offers: Offer[];
  cityName: CityName;
}

function MainPage({ offers, cityName }: MainPageProps): JSX.Element {
  const offersByCity = offers.filter((offer) => offer.city.name === cityName);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {CITIES.map((city) => (
                <li key={city} className="locations__item">
                  <NavLink
                    className={({ isActive }) => classNames('locations__item-link tabs__item', { 'tabs__item--active': isActive })}
                    to={`/${city.toLowerCase()}`}
                  >
                    <span>{city}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <OffersList offers={offersByCity} />
      </main>
    </div>
  );
}

export default MainPage;
