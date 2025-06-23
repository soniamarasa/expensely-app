// src/helpers/LocalStorage.ts

export const setLocalStorage = (key: string, value: any): void => {
  try {
    const jsonData = JSON.stringify(value);
    localStorage.setItem(key, jsonData);
  } catch (error) {
    console.error(`Erro ao salvar no LocalStorage (key: ${key}):`, error);
  }
};

export const getLocalStorage = <T = any>(key: string): T | null => {
  try {
    const jsonData = localStorage.getItem(key);
    if (jsonData === null) return null;
    return JSON.parse(jsonData) as T;
  } catch (error) {
    console.error(`Erro ao ler do LocalStorage (key: ${key}):`, error);
    return null;
  }
};

export const removeLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Erro ao remover do LocalStorage (key: ${key}):`, error);
  }
};

export const clearLocalStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Erro ao limpar o LocalStorage:', error);
  }
};

export const hasLocalStorageKey = (key: string): boolean => {
  try {
    return localStorage.getItem(key) !== null;
  } catch (error) {
    console.error(`Erro ao verificar existência da key no LocalStorage (key: ${key}):`, error);
    return false;
  }
};
