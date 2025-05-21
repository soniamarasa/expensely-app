export interface IWorkspace {
  id?: string;
  name: string;
  userId?: string;
  users?: IWorkspaceUsers[];
  color: string;
  type: string;
}

export interface IWorkspaceUsers {
  id?: string;
  name: string;
  email?: string;
}

export interface IWorkspaceType {
  id?: string;
  name: string;
  icon?: string;
}

