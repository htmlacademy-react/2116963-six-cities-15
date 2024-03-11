import Header from '../../components/header';
import Footer from '../../components/footer';
import { Helmet } from 'react-helmet-async';
import type { Offer } from '../../types/offer';
import classNames from 'classnames';
import EmptyList from '../../components/empty-list';
import FavoritesList from './favorites-list';

type FavoritesPageProps = {
  offers: Offer[];
}

function FavoritesPage({ offers: allOffers }: FavoritesPageProps): JSX.Element {
  const offers = allOffers.filter((offer) => offer.isFavorite);

  return (
    <div className={classNames('page', { 'page--favorites-empty': !offers.length })}>
      <Helmet>
        <title>6 cities. Favorites.</title>
      </Helmet>
      <Header />
      <main className={classNames('page__main page__main--favorites', { 'page__main--favorites-empty': !offers.length })}>
        <div className="page__favorites-container container">
          <section className={classNames('favorites', { 'favorites--empty': !offers.length, })}>
            <h1 className={classNames({ 'favorites__title': offers.length, 'visually-hidden': !offers.length, })}>
              {offers.length ? 'Saved listing' : 'Favorites (empty)'}
            </h1>
            {offers.length ? <FavoritesList offers={offers} /> : <EmptyList classStart='favorites' />}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesPage;
