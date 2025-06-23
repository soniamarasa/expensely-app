import React, { createContext, useContext } from 'react';
import { IWorkspace } from '../interfaces/IWorkspace';

interface WorkspaceContextType {
  workspaces: IWorkspace[];
  setWorkspaces: React.Dispatch<React.SetStateAction<IWorkspace[]>>;
  currentBalance: number;
  setCurrentBalance: React.Dispatch<React.SetStateAction<number>>;
}

export const WorkspaceContext = createContext<WorkspaceContextType>(
  {} as WorkspaceContextType
);

export const useWorkspaceContext = () => useContext(WorkspaceContext);

export const WorkspaceStorage = ({ children }: { children: any }) => {
  const [workspaces, setWorkspaces] = React.useState([] as IWorkspace[]);
  const [currentBalance, setCurrentBalance] = React.useState(0);

  return (
    <WorkspaceContext.Provider value={{ workspaces, setWorkspaces, currentBalance, setCurrentBalance }}>
      {children}
    </WorkspaceContext.Provider>
  );
};
