'use client';

import { useState } from 'react';

interface CreateCardFormProps {
  onAddTask: (title: string, description: string, dueDate: string) => void;
}

export default function CreateCardForm({ onAddTask }: CreateCardFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAddTask(title.trim(), description.trim(), dueDate);
    setTitle('');
    setDescription('');
    setDueDate('');
    setIsOpen(false);
  };

  return (
    <div className="mb-6">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-blue-400 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-400 transition-colors"
        >
          + Add New Task
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 border-2 border-blue-400 dark:border-blue-600 rounded-lg transition-colors">
          <div className="space-y-3">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title *
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter task title"
                required
                autoFocus
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description (optional)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter task description"
                rows={2}
              />
            </div>

            {/* حقل التاريخ الجديد */}
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Due Date (optional)
              </label>
              <input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                min={new Date().toISOString().split('T')[0]} // يمنع اختيار تاريخ ماضي
              />
            </div>
            
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Task
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-600 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}