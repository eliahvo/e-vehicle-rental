import { validate, ValidationError } from 'class-validator';

/**
 * Helper to validate an entity.
 * @param entity The entity to validate.
 */
export const validateEntity = async (entity: any) => {
  const errors: ValidationError[] = await validate(entity);
  // Check if there were errors
  if (errors.length > 0) {
    throw errors;
  }
};
