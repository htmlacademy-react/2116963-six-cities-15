import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../const';
import HeaderNavigation from './header-navigation';

function Header(): JSX.Element {
  const currentPath = useLocation().pathname;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className={`header__logo-link${currentPath === AppRoute.Root ? ' header__logo-link--active' : ''}`} to="/">
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </Link>
          </div>
          {currentPath !== AppRoute.Login && <HeaderNavigation />}
        </div>
      </div>
    </header>
  );
}

export default Header;
