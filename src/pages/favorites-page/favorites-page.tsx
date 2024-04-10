import classNames from 'classnames';
import { Helmet } from 'react-helmet-async';
import EmptyList from '../../components/empty-list';
import Footer from '../../components/footer';
import Header from '../../components/header';
import { useAppSelector } from '../../hooks/state';
import { favoritesSelectors } from '../../store/slices/favorites';
import FavoritesList from './favorites-list';

function FavoritesPage(): JSX.Element {
  const offers = useAppSelector(favoritesSelectors.favorites);

  return (
    <div className={classNames('page', { 'page--favorites-empty': !offers.length })}>
      <Helmet>
        <title>6 cities. Favorites.</title>
      </Helmet>
      <Header />
      <main className={classNames('page__main page__main--favorites', { 'page__main--favorites-empty': !offers.length })}>
        <div className="page__favorites-container container">
          <section className={classNames('favorites', { 'favorites--empty': !offers.length, })}>
            <h1 className={classNames(offers.length ? 'favorites__title' : 'visually-hidden')}>
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
