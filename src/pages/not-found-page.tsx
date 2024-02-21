import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Page not found.</title>
      </Helmet>
      <main className="page__main">
        <div className="container">
          <h1>404. Page not found</h1>
          <Link to="/">Go to homepage</Link>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
