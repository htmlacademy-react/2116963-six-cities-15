import { memo } from 'react';
import BookmarkButton from '../../components/bookmark-button';
import PremiumMark from '../../components/premium-mark';
import Price from '../../components/price';
import Rating from '../../components/rating';
import Reviews from '../../components/reviews';
import { FullOffer } from '../../types/offer';
import Features from './features';
import Goods from './goods';
import Host from './host';

type OfferContainerProps = {
  offer: FullOffer;
}

function OfferContainer_({ offer }: OfferContainerProps) {
  return (
    <div className="offer__container container">
      <div className="offer__wrapper">
        {offer.isPremium && <PremiumMark className='offer__mark' />}
        <div className="offer__name-wrapper">
          <h1 className="offer__name">
            {offer.title}
          </h1>
          <BookmarkButton classStart='offer' width={31} height={33} offerId={offer.id} isFavorite={offer.isFavorite} />
        </div>
        <Rating classStart='offer' rating={offer.rating} />
        <Features offer={offer} />
        <Price classStart='offer' price={offer.price} />
        {Boolean(offer.goods.length) && <Goods goods={offer.goods} />}
        <Host offer={offer} />
        <Reviews offerId={offer.id} />
      </div>
    </div>
  );
}

const OfferContainer = memo(OfferContainer_);

export default OfferContainer;
