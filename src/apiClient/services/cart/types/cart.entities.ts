export interface ICart {
  id: string;
  userId: string;
  cartProject: ICartProject[];
}

export interface ICartProject {
  id: string;
  totalPrice: number;
  project: {
    title: string;
  };
  cartProjectImage: ICartProjectImage[];
}

export interface ICartProjectImage {
  id: string;
  image: {
    id: string;
    title: string;
    author: string;
    price: number;
    currency: string;
    orderIndex: number;
    originalKey: string;
    thumbnailKey: string;
    originalUrl: string;
    thumbnailUrl: string;
    projectId: string;
    createdAt: string;
    updatedAt: string;
  };
}
