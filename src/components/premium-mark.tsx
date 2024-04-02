import { memo } from 'react';

type PremiumMarkProps = {
  className: string;
}

function PremiumMark_({ className }: PremiumMarkProps) {
  return (
    <div className={className}>
      <span>Premium</span>
    </div>
  );
}

const PremiumMark = memo(PremiumMark_);

export default PremiumMark;
