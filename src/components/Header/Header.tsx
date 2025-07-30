import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { CalendarInput } from './Calendar/Calendar';
import { ActionsMenu } from './ActionsMenu/ActionsMenu';
import { Menu } from './Menu/Menu';

import { useAuth } from '../../contexts/AuthContext';

import Logo from '../../assets/expensely-icon.png';
import './Header.scss';

export const Header = () => {
  const location = useLocation();
  const rotes = ['/auth', '/signup'];
  const { user, loading } = useAuth();

  if (loading) return null;

  console.log(user)

  return (
    <>
      {' '}
      {!rotes.includes(location.pathname) &&
        !location.pathname.includes('/password-reset') && (
          <div className="header">
            <div className="header-container">
              <img className="logo" src={Logo} alt="" />
              <div className="actions">
                <Menu />
              </div>

              <CalendarInput />
              <div className="user-actions">
                <div className="user-data"></div>
                {user?.name}
                {user && <ActionsMenu user={user} />}
              </div>
            </div>
          </div>
        )}{' '}
    </>
  );
};
