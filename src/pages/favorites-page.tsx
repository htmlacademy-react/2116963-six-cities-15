import Header from '../components/header';
import Footer from '../components/footer';
import { Helmet } from 'react-helmet-async';
import type { Offer } from '../types/offer';
import { CITIES } from '../const';
import Card from '../components/card';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

type FavoritesPageProps = {
  offers: Offer[];
}

type FavoritesProps = {
  favorites: Offer[];
}

type FavoritesLocationProps = {
  city: typeof CITIES[number];
  offersByCity: Offer[];
}

const favoritesEmpty = (
  <section className="favorites favorites--empty">
    <h1 className="visually-hidden">Favorites (empty)</h1>
    <div className="favorites__status-wrapper">
      <b className="favorites__status">Nothing yet saved.</b>
      <p className="favorites__status-description">
        Save properties to narrow down search or plan your future trips.
      </p>
    </div>
  </section>
);

function FavoritesLocation({ city, offersByCity }: FavoritesLocationProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={`/${city.slug}`}>
            <span>{city.name}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {offersByCity.map((offer) => <Card classStart='favorites' offer={offer} key={offer.id} />)}
      </div>
    </li>
  );
}

function Favorites({ favorites }: FavoritesProps): JSX.Element {
  function renderFavoritesLocations(): (JSX.Element | undefined)[] {
    return CITIES.map((city) => {
      const offersByCity = favorites.filter((offer) => offer.city.name === city.name);
      if (offersByCity.length) {
        return <FavoritesLocation key={city.slug} city={city} offersByCity={offersByCity} />;
      }
    });
  }
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {renderFavoritesLocations()}
      </ul>
    </section>

  );
}

function FavoritesPage({ offers }: FavoritesPageProps): JSX.Element {
  const favorites = offers.filter((offer) => offer.isFavorite);

  return (
    <div className={classNames('page', { 'page--favorites-empty': !favorites.length })}>
      <Helmet>
        <title>6 cities. Favorites.</title>
      </Helmet>
      <Header />
      <main className={classNames('page__main page__main--favorites', { 'page__main--favorites-empty': favorites.length })}>
        <div className="page__favorites-container container">
          {favorites.length ? <Favorites favorites={favorites} /> : favoritesEmpty}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesPage;
