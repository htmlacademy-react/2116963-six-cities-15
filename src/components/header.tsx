import { useLocation } from 'react-router-dom';
import { AppRoute } from '../const';
import HeaderNavigation from './header-navigation';
import CustomLink from './custom-link';
import { memo } from 'react';

type HeaderProps = {
  logoIsActive?: true;
}

const logoImage = (
  <img
    className="header__logo"
    src="img/logo.svg"
    alt="6 cities logo"
    width={81}
    height={41}
  />
);

// eslint-disable-next-line prefer-arrow-callback
const Header = memo(function Header({ logoIsActive }: HeaderProps): JSX.Element {
  const currentPath = useLocation().pathname;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <CustomLink
              className='header__logo-link'
              activeClassName='header__logo-link--active'
              isActive={logoIsActive}
              to={AppRoute.RootCity}
            >
              {logoImage}
            </CustomLink>
          </div>
          {currentPath !== AppRoute.Login && <HeaderNavigation currentPath={currentPath} />}
        </div>
      </div>
    </header>
  );
});

export default Header;
