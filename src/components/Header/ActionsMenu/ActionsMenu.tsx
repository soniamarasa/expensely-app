import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TieredMenu } from 'primereact/tieredmenu';
import { MenuItem } from 'primereact/menuitem';
import './ActionsMenu.scss';
import { ThemeDialog } from '../../Dialogs/ThemeDialog';
import { removeLocalStorage } from '../../../helpers/LocalStorage';
import { IUser } from '../../../interfaces/IUser';
import { UserAvatar } from '../../UserAvatar/UserAvatar';

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
        removeLocalStorage('auth');
        removeLocalStorage('userId');
        navigate('/auth');
      },
    },
  ];

  return (
    <>
      <TieredMenu model={items} popup ref={menu} />

      <UserAvatar
        email={user?.email}
        size={30}
        onClick={(e) => menu.current?.toggle(e)}
        title="Abrir menu do usuário"
      />

      <ThemeDialog visible={dialogVisible} onHide={setDialogVisible} />
    </>
  );
};
