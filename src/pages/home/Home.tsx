import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { getWorkspaces, newWorkspace } from '../../services/workspaces-api';
import { IWorkspace } from '../../interfaces/IWorkspace';
import { getLocalStorage } from '../../helpers/LocalStorage';
import ImgHome from '../../assets/home.svg';
import './Home.scss';

export const Home = () => {
  const [workspaces, setWorkspaces] = useState<IWorkspace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      setLoading(true);
      const res = await getWorkspaces();
      if (res?.data) {
        setWorkspaces(res.data);
      } else {
        setWorkspaces([]);
      }
    } catch (err) {
      console.error('Erro ao buscar workspaces', err);
      setWorkspaces([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFirstWorkspace = async () => {
    const novo: IWorkspace = {
      name: 'Meu Primeiro Workspace',
      userId: getLocalStorage('userId') ?? undefined,
      users: [],
      color: '#2196F3', // azul default
      type: 'pessoal',
    };

    try {
      const res = await newWorkspace(novo);
      if (res?.data) {
        await fetchWorkspaces(); // atualiza lista
      }
    } catch (err) {
      console.error('Erro ao criar workspace', err);
    }
  };

  return (
    <div className=" page-container home-container">
      {loading ? (
        <p>Carregando workspaces...</p>
      ) : workspaces.length > 0 ? (
        <div className="grid gap-3">
          {workspaces.map((ws) => (
            <Card key={ws.id} title={ws.name} className="col-12 md:col-4">
              <p>
                <strong>Cor:</strong>{' '}
                <span style={{ color: ws.color }}>{ws.color}</span>
              </p>
              <p>
                <strong>Tipo:</strong> {ws.type}
              </p>
              <p>
                <strong>Membros:</strong> {ws.users?.length ?? 0}
              </p>
            </Card>
          ))}
        </div>
      ) : (
        <div className="empty-workspace text-center">
          <h2>Você ainda não tem nenhum workspace criado.</h2>

          <img src={ImgHome} alt="Login Illustration" />

          <Button
            label="Criar primeiro workspace"
            icon="pi pi-plus"
            onClick={handleCreateFirstWorkspace}
            className="p-button-lg mt-3"
          />
        </div>
      )}
    </div>
  );
};
