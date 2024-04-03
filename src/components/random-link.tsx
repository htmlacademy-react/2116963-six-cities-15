import { memo } from 'react';
import { Link } from 'react-router-dom';
import { CITIES } from '../const';
import { getRandomItem } from '../utils';

function RandomLink_() {
  const city = getRandomItem(CITIES);

  return (
    <Link className="locations__item-link" to={`/${city.slug}`}>
      <span>{city.name}</span>
    </Link>
  );
}

const RandomLink = memo(RandomLink_);

export default RandomLink;
