export interface User {
  id: string;
  email: string;
  password: string;
}

export interface Dataset {
  id: string;
  name: string;
  description: string;
  tags: string[];
  createdAt: Date;
  userId: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface CreateDatasetRequest {
  name: string;
  description: string;
  tags: string[];
}
