import classNames from 'classnames';
import { Link } from 'react-router-dom';

type CustomLinkProps = {
  className?: string;
  activeClassName?: string;
  isActive?: boolean;
  currentPath?: string;
  to: string;
  children?: JSX.Element;
}

function CustomLink({ className, activeClassName, isActive, currentPath, to, children }: CustomLinkProps) {
  if (isActive || currentPath === to) {
    return <span className={classNames(className, activeClassName)}>{children}</span>;
  }
  return <Link className={className} to={to}>{children}</Link>;
}

export default CustomLink;
