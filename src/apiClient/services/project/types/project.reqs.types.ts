export interface ICreateProject {
  title: string;
  description: string;
}

export interface IProject {
  id: string;
  title: string;
  description: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}
