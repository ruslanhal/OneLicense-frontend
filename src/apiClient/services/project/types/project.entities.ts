export interface IProjectEntity {
  id: string;
  title: string;
  description: string;
  author: string;
  ownerId: string;
  images: IImage[];
  createdAt: string;
  updatedAt: string;
}

export interface IImage {
  id: string;
  title: string;
  author: string;
  price: string;
  originalKey: string;
  thumbnailKey: string;
  originalUrl: string;
  thumbnailUrl: string;
  projectId: string;
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
