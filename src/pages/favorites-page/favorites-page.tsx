import Header from '../../components/header';
import Footer from '../../components/footer';
import { Helmet } from 'react-helmet-async';
import classNames from 'classnames';
import EmptyList from '../../components/empty-list';
import FavoritesList from './favorites-list';
import { useAppSelector } from '../../hooks/state';
import { offersSelectors } from '../../store/slices/offers';

function FavoritesPage(): JSX.Element {
  const allOffers = useAppSelector(offersSelectors.offers);
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
