type GoodsProps = {
  goods: string[];
}

function Goods({ goods }: GoodsProps) {
  return (
    <div className="offer__inside">
      <h2 className="offer__inside-title">What&rsquo;s inside</h2>
      <ul className="offer__inside-list">
        {goods.map((item) => (
          <li key={item} className="offer__inside-item">{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Goods;
