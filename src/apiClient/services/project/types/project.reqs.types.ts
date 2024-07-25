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

export interface IGeneratePresignedUrl {
  files: IFileReq[];
}

export interface IFileReq {
  title: string;
  description: string;
  mimeType: string;
}
