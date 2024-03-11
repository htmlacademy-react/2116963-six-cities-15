type PremiumMarkProps = {
  className: string;
}

function PremiumMark({ className }: PremiumMarkProps) {
  return (
    <div className={className}>
      <span>Premium</span>
    </div>
  );
}

export default PremiumMark;
