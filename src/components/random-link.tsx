import { Link } from 'react-router-dom';
import { CITIES } from '../const';
import { getRandomArrayItem } from '../utils';

function RandomLink() {
  const city = getRandomArrayItem(CITIES);

  return (
    <Link className="locations__item-link" to={`/${city.slug}`}>
      <span>{city.name}</span>
    </Link>
  );
}

export default RandomLink;
