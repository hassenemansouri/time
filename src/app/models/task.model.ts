export interface Task {
  id: string;
  title: string;
  description: string;
  createdDate?: string;
  dueDate?:string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
}
