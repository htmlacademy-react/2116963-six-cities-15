import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../const';
import HeaderNavigation from './header-navigation';

const logoImage = (
  <img
    className="header__logo"
    src="img/logo.svg"
    alt="6 cities logo"
    width={81}
    height={41}
  />
);

function Header(): JSX.Element {
  const currentPath = useLocation().pathname;

  const logo = currentPath === AppRoute.Root ?
    (
      <span className={'header__logo-link'}>
        {logoImage}
      </span>
    ) :
    (
      <Link className={'header__logo-link header__logo-link--active'} to={AppRoute.Root}>
        {logoImage}
      </Link>
    );

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            {logo}
          </div>
          {currentPath !== AppRoute.Login && <HeaderNavigation />}
        </div>
      </div>
    </header>
  );
}

export default Header;
