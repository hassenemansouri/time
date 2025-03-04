export interface Task {
  id: string;
  title: string;
  description: string;
  createdDate?: Date | null;
  dueDate?: Date | null;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
}
