type PriceProps = {
  classStart: string;
  price: number;
}

const CARD_CLASS = 'place-card';

function Price({ classStart, price }: PriceProps) {
  const isCard = classStart === CARD_CLASS;

  return (
    <div className={`${classStart}__price`}>
      <b className={`${classStart}__price-value`}>&euro;{price}</b>
      <span className={`${classStart}__price-text`}>{isCard && '/'}&nbsp;night</span>
    </div>
  );
}

export default Price;
