export interface ITag {
  id?: string;
  title: string;
}

export interface IAssignedTag {
  id: string;
  projectId: string;
  tagId: string;
  assignedAt: string;
  assignedById: string;
}
