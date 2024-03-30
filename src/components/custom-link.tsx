import classNames from 'classnames';
import { memo } from 'react';
import { Link } from 'react-router-dom';

type CustomLinkProps = {
  className?: string;
  activeClassName?: string;
  isActive?: boolean;
  currentPath?: string;
  to: string;
  children?: JSX.Element;
}

function CustomLink_({ className, activeClassName, isActive, currentPath, to, children }: CustomLinkProps) {
  if (isActive || currentPath === to) {
    return <span className={classNames(className, activeClassName)}>{children}</span>;
  }
  return <Link className={className} to={to}>{children}</Link>;
}

const CustomLink = memo(CustomLink_);

export default CustomLink;
