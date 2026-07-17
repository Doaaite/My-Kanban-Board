'use client';

import { Task, ColumnId, EditingTask } from '@/types';
import TaskCard from './TaskCard';

interface ColumnProps {
  id: ColumnId;
  title: string;
  tasks: Task[];
  onMoveTask: (taskId: string, newColumn: ColumnId) => void;
  onDeleteTask: (taskId: string) => void;
 onEditTask: (taskId: string, title: string, description: string, dueDate: string) => void;
   editingTask: EditingTask;
  onStartEdit: (task: Task) => void;
  onCancelEdit: () => void;
}

const columnColors = {
  'todo': 'border-blue-400 bg-blue-50',
  'in-progress': 'border-yellow-400 bg-yellow-50',
  'completed': 'border-green-400 bg-green-50'
};

export default function Column({ 
  id, 
  title, 
  tasks, 
  onMoveTask, 
  onDeleteTask,
  onEditTask,
  editingTask,
  onStartEdit,
  onCancelEdit
}: ColumnProps) {
  return (
    <div className={`flex-1 min-w-[280px] border-2 rounded-lg p-4 ${columnColors[id]}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">{title}</h2>
        <span className="bg-white px-2 py-1 rounded-full text-sm font-medium">
          {tasks.length}
        </span>
      </div>
      
      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onMove={onMoveTask}
            onDelete={onDeleteTask}
            onEdit={onEditTask}
            isEditing={editingTask?.id === task.id}
            onStartEdit={onStartEdit}
            onCancelEdit={onCancelEdit}
          />
        ))}
      </div>
    </div>
  );
}