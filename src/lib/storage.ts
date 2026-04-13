import type { ParticipantSeed } from "@/data/participants";

// Функция для получения данных из localStorage 
export const getFromLocalStorage = (key: string): (ParticipantSeed & { letter: string})[] | null => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

// Функция для сохранения данных в localStorage 
export const saveToLocalStorage = (key: string, value: (ParticipantSeed & { letter: string})[]) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Функция для удаления данных из localStorage
export const removeFromLocalStorage = (key:string) => {
    localStorage.removeItem(key)
}