export type ColumnId = 'todo' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  columnId: ColumnId;
  dueDate?: string;  // إضافة تاريخ الاستحقاق (اختياري)
}

export interface BoardState {
  tasks: Task[];
}

export type EditingTask = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
} | null;