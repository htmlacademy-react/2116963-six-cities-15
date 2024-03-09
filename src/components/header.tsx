import { useLocation } from 'react-router-dom';
import { AppRoute } from '../const';
import HeaderNavigation from './header-navigation';
import { isPathRootCity } from '../utils';
import CustomLink from './custom-link';

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
  const isPathRoot = isPathRootCity(currentPath);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <CustomLink
              className='header__logo-link'
              activeClassName='header__logo-link--active'
              isActive={isPathRoot}
              to={AppRoute.RootCity}
            >
              {logoImage}
            </CustomLink>
          </div>
          {currentPath !== AppRoute.Login && <HeaderNavigation />}
        </div>
      </div>
    </header>
  );
}

export default Header;
