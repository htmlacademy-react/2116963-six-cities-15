import classNames from 'classnames';
import { useLocation, Link } from 'react-router-dom';

type CustomLinkProps = {
  className?: string;
  activeClassName?: string;
  to: string;
  children?: JSX.Element;
}

function CustomLink({ className, activeClassName, to, children }: CustomLinkProps) {
  const currentPath = useLocation().pathname;
  const isActive = currentPath === to;

  if (isActive) {
    return <span className={classNames(className, activeClassName)}>{children}</span>;
  }
  return <Link className={className} to={to}>{children}</Link>;
}

export default CustomLink;
