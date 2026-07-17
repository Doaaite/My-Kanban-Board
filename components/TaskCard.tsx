'use client';

import { Task, ColumnId, EditingTask } from '@/types';
import { useState } from 'react';

interface TaskCardProps {
  task: Task;
  onMove: (taskId: string, newColumn: ColumnId) => void;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string, title: string, description: string, dueDate: string) => void;
  isEditing: boolean;
  onStartEdit: (task: Task) => void;
  onCancelEdit: () => void;
}

const columns: { id: ColumnId; label: string }[] = [
  { id: 'todo', label: 'To Do' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'completed', label: 'Completed' }
];

// دالة مساعدة لتحديد لون التاريخ
const getDueDateColor = (dueDate: string): string => {
  if (!dueDate) return 'text-gray-500 dark:text-gray-400';
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return 'text-red-600 dark:text-red-400 font-semibold'; // متأخر
  } else if (diffDays <= 2) {
    return 'text-orange-500 dark:text-orange-400 font-semibold'; // قريب
  } else if (diffDays <= 5) {
    return 'text-yellow-600 dark:text-yellow-500'; // خلال 5 أيام
  } else {
    return 'text-green-600 dark:text-green-400'; // بعيد
  }
};

// تنسيق التاريخ للعرض
const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export default function TaskCard({ 
  task, 
  onMove, 
  onDelete, 
  onEdit,
  isEditing,
  onStartEdit,
  onCancelEdit
}: TaskCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showMoveMenu, setShowMoveMenu] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '');

  const handleDelete = () => {
    onDelete(task.id);
    setShowDeleteConfirm(false);
  };

  const handleMove = (newColumn: ColumnId) => {
    if (newColumn !== task.columnId) {
      onMove(task.id, newColumn);
    }
    setShowMoveMenu(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitle.trim()) return;
    onEdit(task.id, editTitle.trim(), editDescription.trim(), editDueDate);
  };

  // وضع التعديل
  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded shadow-sm border-2 border-blue-400 dark:border-blue-600">
        <form onSubmit={handleEditSubmit}>
          <div className="space-y-2">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm dark:bg-gray-700 dark:text-white"
              placeholder="Task title"
              required
              autoFocus
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm dark:bg-gray-700 dark:text-white"
              placeholder="Description (optional)"
              rows={2}
            />
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm dark:bg-gray-700 dark:text-white"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onCancelEdit}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-600 dark:text-white text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  // العرض العادي
  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1">
          <h3 className="font-medium text-sm dark:text-white">{task.title}</h3>
          {task.description && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{task.description}</p>
          )}
          
          {/* عرض التاريخ مع الأيقونة */}
          {task.dueDate && (
            <div className="flex items-center gap-1 mt-2 text-xs">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className={getDueDateColor(task.dueDate)}>
                {formatDate(task.dueDate)}
                {new Date(task.dueDate) < new Date() && ' ⚠️ Overdue'}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex gap-1 flex-shrink-0">
          {/* زر التعديل */}
          <button
            onClick={() => onStartEdit(task)}
            aria-label="Edit task"
            className="p-1 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 rounded"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          {/* زر النقل */}
          <div className="relative">
            <button
              onClick={() => setShowMoveMenu(!showMoveMenu)}
              aria-label="Move task"
              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded"
              aria-expanded={showMoveMenu}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
            
            {showMoveMenu && (
              <div className="absolute right-0 mt-1 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow-lg py-1 z-10 min-w-[120px]">
                {columns.map(col => (
                  <button
                    key={col.id}
                    onClick={() => handleMove(col.id)}
                    className={`block w-full text-left px-4 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white ${
                      col.id === task.columnId ? 'bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-500' : ''
                    }`}
                    disabled={col.id === task.columnId}
                  >
                    {col.id === task.columnId ? '✓ ' : ''}{col.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* زر الحذف */}
          <button
            onClick={() => setShowDeleteConfirm(true)}
            aria-label="Delete task"
            className="p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 rounded"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* تأكيد الحذف */}
      {showDeleteConfirm && (
        <div className="mt-2 p-2 bg-red-50 dark:bg-red-950/50 rounded border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-700 dark:text-red-400 mb-2">Delete this task?</p>
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
            >
              Yes
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-3 py-1 bg-gray-300 dark:bg-gray-600 dark:text-white text-sm rounded hover:bg-gray-400 dark:hover:bg-gray-500"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}