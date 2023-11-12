import React from 'react';
import { ButtonIcon, ButtonLocale, ButtonTheme } from '../atoms';
import { TbLogout } from 'react-icons/tb';
import { AiOutlineGithub } from 'react-icons/ai';
import { GoStack } from 'react-icons/go';
import { RxArchive } from 'react-icons/rx';
import { titleLogoutButton, descNavPageLink } from '../../utils/transcript-data';
import NavLink from '../molecules/NavLink';

type Props = {
  onLogout: () => void;
};

const NavBar = ({ onLogout }: Props) => {
  return (
    <>
      <div className="top">
        <div className="link-container">
          <a href="https://github.com/WahyuIndG" title="Creator Github">
            <AiOutlineGithub />
          </a>
          <ButtonLocale />
        </div>
        <h1>Notes App</h1>
        <div className="link-container">
          <ButtonTheme />
          <ButtonIcon icon={TbLogout} onClick={onLogout} title={titleLogoutButton} />
        </div>
      </div>
      <ul className="nav">
        <NavLink activeLink={location.pathname} Icon={GoStack} path="/">
          {descNavPageLink.active}
        </NavLink>
        <NavLink activeLink={location.pathname} Icon={RxArchive} path="/archive">
          {descNavPageLink.archive}
        </NavLink>
      </ul>
    </>
  );
};

export default NavBar;
