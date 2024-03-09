import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import CustomLink from '../components/custom-link';
import Header from '../components/header';
import OffersList from '../components/offers-list';
import { CITIES } from '../const';
import type { CityName, Offer } from '../types/offer';

type MainPageProps = {
  offers: Offer[];
  cityName: CityName;
}

function MainPage({ offers, cityName }: MainPageProps): JSX.Element {
  const currentPath = useLocation().pathname;
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
        <OffersList offers={offersByCity} />
      </main>
    </div>
  );
}

export default MainPage;
