import Header from '../components/header';
import Footer from '../components/footer';
import { Helmet } from 'react-helmet-async';
import type { Offer, CitiesType } from '../types/offer';
import { Cities } from '../const';
import Card from '../components/card';
import classNames from 'classnames';

type FavoritesPageProps = {
  offers: Offer[];
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

function FavoritesLocation({ city, offerByCity }: { city: CitiesType; offerByCity: Offer[] }): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offerByCity.map((offer) => <Card key={offer.id} offer={offer} />)}
      </div>
    </li>
  );
}

function Favorites({ favorites }: { favorites: Offer[] }): JSX.Element {
  function renderFavoritesLocations(): (JSX.Element | undefined)[] {
    return Cities.map((city) => {
      const offerByCity = favorites.filter((offer) => offer.city.name === city);
      if (offerByCity.length) {
        return <FavoritesLocation key={city} city={city} offerByCity={offerByCity} />;
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
    <div className="page page--favorites-empty">
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
