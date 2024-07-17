export interface IProject {
  id: string;
  title: string;
  description: string;
  ownerName: string;
  ownerId: string;
  collections?: ICollection[];
  createdAt: string;
  updatedAt: string;
}

export interface ICollection {
  id: string;
  title: string;
  description: string;
  projectId: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}
