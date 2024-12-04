export interface Task {
  id: string;
  title: string;
  description: string;
  categories: string[];
  completed: boolean;
  date: string;
  createdAt: string;
}

export type Category = {
  id: string;
  name: string;
  icon: string;
};