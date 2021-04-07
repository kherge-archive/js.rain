import { Option, none, some } from "@kherge/result";

/**
 * Retrieves a value from local storage.
 *
 * @param id  The unique identifier.
 *
 * @return The value, if any.
 */
export const getItem = <T>(id: string): Option<T> => {
  const value = localStorage.getItem(id);

  if (value !== null) {
    console.debug(`getItem(${id})`);

    return some(JSON.parse(value) as T);
  }

  return none();
};

/**
 * Sets a value in local storage.
 *
 * @param id    The unique identifier.
 * @param value The value to set.
 */
export const setItem = (id: string, value: any) => {
  console.debug(`setItem(${id})`);

  localStorage.setItem(id, JSON.stringify(value));
};
