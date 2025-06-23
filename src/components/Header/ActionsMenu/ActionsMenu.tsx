import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TieredMenu } from 'primereact/tieredmenu';
import { MenuItem } from 'primereact/menuitem';
import { Button } from 'primereact/button';
import './ActionsMenu.scss';
import { ThemeDialog } from '../../Dialogs/ThemeDialog';
import { logout } from '../../../services/user-api';
import { removeLocalStorage } from '../../../helpers/LocalStorage';
import Gravatar from 'react-gravatar';
import { IUser } from '../../../interfaces/IUser';

export interface Props {
  user?: IUser | null;
}

export const ActionsMenu = ({ user }: Props) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const navigate = useNavigate();
  const menu = useRef<TieredMenu>(null);
  const items: MenuItem[] = [
    {
      label: 'Perfil',
      className: 'icon-menu',
      icon: 'pi pi-user',
      command: () => {
        navigate('/user');
      },
    },
    {
      label: 'Tema',
      className: 'icon-menu',
      icon: 'pi pi-palette',
      command: () => {
        setDialogVisible(true);
      },
    },
    {
      label: 'Sair',
      className: 'icon-menu',
      icon: 'pi pi-fw pi-power-off',
      command: () => {
        logout().then(() => {
          removeLocalStorage('auth');
          removeLocalStorage('userId');
          navigate('/auth');
        });
      },
    },
  ];

  return (
    <>
      <TieredMenu model={items} popup ref={menu} />

      <Gravatar
        email={user?.email || 'default@email.com'}
        size={30}
        style={{
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'inline-block',
        }}
        onClick={(e: React.MouseEvent) => menu.current?.toggle(e)}
        alt="User Avatar"
      />

      <ThemeDialog visible={dialogVisible} onHide={setDialogVisible} />
    </>
  );
};
