import React, { useContext } from 'react';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';
import LocaleContext from '../../contexts/LocaleContext';

interface NavLinkProps {
  activeLink: string;
  path: string;
  Icon: IconType;
  children: { en: string; id: string };
}
const NavLink = ({ activeLink, path, Icon, children }: NavLinkProps) => {
  const { locale } = useContext(LocaleContext);
  return (
    <li>
      <Link to={path} className={activeLink === path ? 'active' : ''}>
        <Icon />
        <span>{locale === 'en' ? children.en : children.id}</span>
      </Link>
    </li>
  );
};

export default NavLink;
