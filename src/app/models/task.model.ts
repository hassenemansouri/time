export interface Task {
  id_task: string;
  name: string;
  description: string;
  createdDate?: Date | null;
  dueDate?: Date | null;
  priority: 'LOW' | 'MEDIUM ' | 'HIGH';
}
