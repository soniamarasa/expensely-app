import React, { useEffect, useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { ColorPicker } from 'primereact/colorpicker';
import { IconsOverlayPanel } from '../IconsOverlayPanel/IconsOverlayPanel';
import './Dialog.scss';

import { useToastContext } from '../../contexts/ToastContext';
import { newWorkspace, updateWorkspace } from '../../services/workspaces-api';
import { IWorkspace } from '../../interfaces/IWorkspace';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';


export interface Props {
  visible: boolean;
  onHide: any;
  category?: IWorkspace;
  type: number;
}

export function WorkspaceDialog(props: Props) {
  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<any>('EE7863');
  const [currentIcon, setCurrentIcon] = useState<any>('fa-solid fa-shapes');
  const op = useRef<OverlayPanel>(null);
  const { showToast } = useToastContext();
  const { setWorkspaces } = React.useContext(WorkspaceContext);

  const iconStyle = {
    backgroundColor: `#${color}`,
  };

  const handleIconValue = (value: string) => {
    setCurrentIcon(value);
  };

  const handleSubmit = async () => {
    const response =
      props.category && Object.keys(props.category).length
        ? await updateWorkspace({
            ...props.category,
            name,
            color,
          })
        : await newWorkspace({
            name,
            color,
            icon: currentIcon,
            type: props.type,
          });

    if (response?.status === 200) {
      if(props.category && Object.keys(props.category).length) {
        setWorkspaces((old: IWorkspace[]) => {
          let workspaces: IWorkspace[] = []
          old.forEach((item: IWorkspace) => {
            if(item._id === response.data.category._id) {
              workspaces.push(response.data.category)
            } else workspaces.push(item)
          })
          return workspaces
        })
      } else {
        setWorkspaces((old) => {
          return [...old, response.data.category]
        })
      }
 
      showToast('success', response.data.message);
      props.onHide(false);
    
    } else {
      showToast('error', response);
    }
  };

  const setProps = React.useCallback((cat?: IWorkspace) => {
    setName(cat ? cat.name : '');
    setColor(cat ? cat.color : 'EE7863');
    setCurrentIcon(cat ? cat.icon : 'fa-solid fa-shapes');
  }, []);

  useEffect(() => {
    if (props.category && Object.keys(props.category).length)
      setProps(props.category);
    else setProps();
  }, [props.category, setProps]);

  return (
    <Dialog
      header={props.category?.id ? 'Editar workspace' : 'Novo Workspace'}
      visible={props.visible}
      style={{ width: '350px' }}
      onHide={() => props.onHide(false)}
      appendTo="self"
    >
      <div className="card div-field">
        <label>Nome</label>
        <InputText
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
      </div>
      <div className=" card category-inputs">
        <div className="input-color">
          <label> Icone:</label>

          <div
            style={iconStyle}
            onClick={(e) => op.current && op.current.toggle(e)}
            className="btn-icon-category"
          >
            <i className={currentIcon}></i>{' '}
            <IconsOverlayPanel onIconValueChange={handleIconValue} op={op} />
          </div>
        </div>

        <div className="input-color">
          <label> Cor:</label>
          <ColorPicker
            className=""
            value={color}
            onChange={(e) => setColor(e.value)}
          ></ColorPicker>
        </div>
      </div>
      <div className="p-dialog-footer">
        <Button
          disabled={!name}
          onClick={() => handleSubmit()}
          rounded
          label="Salvar"
        />
      </div>
    </Dialog>
  );
}
