import { Link } from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  return (
    <>
      <h1>404. Page not found</h1>
      <Link to="/">Вернуться на главную</Link>
    </>
  );
}

export default NotFoundPage;
