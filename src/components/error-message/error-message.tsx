
import { useAppSelector } from '../../hooks/state';
import { errorSelectors } from '../../store/slices/error';
import './error-message.css';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector(errorSelectors.error);

  return (error)
    ? <div className="error-message">{error}</div>
    : null;

}

export default ErrorMessage;
