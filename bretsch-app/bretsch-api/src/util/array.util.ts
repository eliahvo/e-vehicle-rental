import { Repository } from 'typeorm';

/**
 * Helper to check an array for an containing element.
 * @param array The array to check.
 * @param elementId The element id to search for.
 */
export const containsId = async (array: any[], elementId: string): Promise<boolean> => {
  return array.some((e: any) => e.id === elementId);
};

/**
 * Helper to remove an element from an array.
 * @param array The array to remove from.
 * @param elementId The element id to remove.
 */
export const removeId = async (array: any[], elementId: string): Promise<any[]> => {
  return array.filter((e: any) => e.id !== elementId);
};

/**
 * Helper to add an element to an array or throw an error if it's already containing the element.
 * @param array The array to add to.
 * @param elementId The element id to add.
 * @param repository The repository used to find the element in.
 */
export const addElement = async (array: any[], elementId: string, repository: Repository<any>): Promise<any[]> => {
  // Make sure element is not already in list
  if (await containsId(array, elementId)) {
    throw Error('already_added');
  }
  const element: any = await repository.findOneOrFail(elementId);
  array.push(element);
  return array;
};

/**
 * Helper to remove an element from an array or throw an error if it's not containing the element.
 * @param array The array to remove from.
 * @param elementId The element id to remove.
 */
export const removeElement = async (array: any[], elementId: string): Promise<any[]> => {
  // Make sure element is in list
  if (!(await containsId(array, elementId))) {
    throw Error('already_removed');
  }
  return removeId(array, elementId);
};
