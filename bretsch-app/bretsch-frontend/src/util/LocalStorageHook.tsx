import { Dispatch, useState } from 'react';

/**
 * Helper to use the local storage instead of useState.
 * @param key The key to save the data to.
 * @param initialValue The initial value, if theres nothing found in the local storage.
 */
export default function useLocalStorage<T>(key: string, initialValue: T): [any, Dispatch<any>] {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item: string | null = localStorage.getItem(key);
      let returnItem = item ? JSON.parse(item) : initialValue;
      if (initialValue instanceof Date) {
        // If its a date, we have to create a new date out of it
        returnItem = new Date(returnItem);
      }
      return returnItem;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
