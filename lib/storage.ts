import { BoardState } from '@/types';

const STORAGE_KEY = 'kanban-board';

export const saveBoard = (state: BoardState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save board:', error);
  }
};

export const loadBoard = (): BoardState => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return { tasks: [] };
    
    const parsed = JSON.parse(data);
    // Validate basic structure
    if (!parsed.tasks || !Array.isArray(parsed.tasks)) {
      return { tasks: [] };
    }
    return parsed;
  } catch (error) {
    console.error('Failed to load board:', error);
    return { tasks: [] };
  }
};