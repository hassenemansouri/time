export interface Project {
  id: string;
  title: string;
  description: string;
  startDate?: Date | null; // Permet null ou undefined
  endDate?: Date | null;
  status: 'to-do' | 'in-progress' | 'completed';
}
