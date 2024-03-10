type EmptyListProps = {
  classStart: 'cities' | 'favorites';
}

const Text = {
  cities: {
    title: 'No places to stay available',
    description: 'We could not find any property available at the moment in Dusseldorf'
  },
  favorites: {
    title: 'Nothing yet saved.',
    description: 'Save properties to narrow down search or plan your future trips.'
  }
} as const;

function EmptyList({ classStart }: EmptyListProps) {
  return (
    <div className={`${classStart}__status-wrapper`}>
      <b className={`${classStart}__status`}>{Text[classStart].title}</b>
      <p className={`${classStart}__status-description`}>
        {Text[classStart].description}
      </p>
    </div>
  );
}

export default EmptyList;
