export interface ProfileModel {
  name: string;
  description?: string;
  age: number;
  phone: string;
  email: string;
  address?: string;
  image?: string;
  techStack?: string[];
}

export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}
