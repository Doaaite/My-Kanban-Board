'use client';

import { useState, useEffect } from 'react';
import { Task, ColumnId, EditingTask } from '@/types';
import { loadBoard, saveBoard } from '@/lib/storage';
import Column from './Column';
import CreateCardForm from './CreateCardForm';

const COLUMNS: { id: ColumnId; title: string }[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'completed', title: 'Completed' }
];

export default function Board() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editingTask, setEditingTask] = useState<EditingTask>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const state = loadBoard();
    setTasks(state.tasks);
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever tasks change
  useEffect(() => {
    if (isLoaded) {
      saveBoard({ tasks });
    }
  }, [tasks, isLoaded]);

  const addTask = (title: string, description: string, dueDate: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      columnId: 'todo',
      dueDate: dueDate || undefined
    };
    setTasks(prev => [...prev, newTask]);
  };

  const moveTask = (taskId: string, newColumnId: ColumnId) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, columnId: newColumnId } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const editTask = (taskId: string, newTitle: string, newDescription: string, newDueDate: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId 
          ? { 
              ...task, 
              title: newTitle, 
              description: newDescription,
              dueDate: newDueDate || undefined
            } 
          : task
      )
    );
    setEditingTask(null);
  };

  const startEdit = (task: Task) => {
    setEditingTask({
      id: task.id,
      title: task.title,
      description: task.description || '',
      dueDate: task.dueDate || ''
    });
  };

  const cancelEdit = () => {
    setEditingTask(null);
  };

  const getTasksByColumn = (columnId: ColumnId) => {
    return tasks.filter(task => task.columnId === columnId);
  };

  if (!isLoaded) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">📋 My Kanban Board</h1>
      </div>
      
      <CreateCardForm onAddTask={addTask} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLUMNS.map(column => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            tasks={getTasksByColumn(column.id)}
            onMoveTask={moveTask}
            onDeleteTask={deleteTask}
            onEditTask={editTask}
            editingTask={editingTask}
            onStartEdit={startEdit}
            onCancelEdit={cancelEdit}
          />
        ))}
      </div>
    </div>
  );
}