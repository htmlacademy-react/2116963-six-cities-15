import { CityName } from '../types/offer';

type EmptyListProps = {
  classStart: keyof typeof Text;
  cityName?: CityName;
}

const Text = {
  'cities': {
    Title: 'No places to stay available',
    Description: 'We could not find any property available at the moment in '
  },
  'favorites': {
    Title: 'Nothing yet saved.',
    Description: 'Save properties to narrow down search or plan your future trips.'
  }
};

function EmptyList({ classStart, cityName }: EmptyListProps) {
  return (
    <div className={`${classStart}__status-wrapper`}>
      <b className={`${classStart}__status`}>{Text[classStart].Title}</b>
      <p className={`${classStart}__status-description`}>
        {Text[classStart].Description + cityName}
      </p>
    </div>
  );
}

export default EmptyList;
