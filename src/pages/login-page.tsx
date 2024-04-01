import { FormEvent, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import Header from '../components/header';
import { useActionCreators } from '../hooks/state';
import { favoritesActions } from '../store/slices/favorites';
import { offersActions } from '../store/slices/offers';
import { userActions } from '../store/slices/user';

function LoginPage(): JSX.Element {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { login } = useActionCreators(userActions);
  const { clearOffers } = useActionCreators(offersActions);
  const { clearFavorites } = useActionCreators(favoritesActions);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {
      toast.promise(
        login({
          email: emailRef.current.value,
          password: passwordRef.current.value
        }).unwrap(),
        {
          pending: 'Login...',
          success: {
            render: () => {
              clearOffers();
              clearFavorites();
              return 'Logged!';
            }
          },
          error: 'Failed to login. Please try again'
        }
      );
    }
  };


  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities. Login.</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={emailRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
