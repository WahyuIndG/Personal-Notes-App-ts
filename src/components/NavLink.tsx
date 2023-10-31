import React from 'react';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  activeLink: string;
  path: string;
  Icon: IconType;
  children: React.ReactNode;
}
const NavLink = ({ activeLink, path, Icon, children }: NavLinkProps) => {
  return (
    <li>
      <Link to={path} className={activeLink === path ? 'active' : ''}>
        <Icon /> <span>{children}</span>
      </Link>
    </li>
  );
};

export default NavLink;
