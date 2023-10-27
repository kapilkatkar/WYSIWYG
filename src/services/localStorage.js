/**
 * Gets the value associated with the specified key from localStorage.
 * @param {string} key - The key to retrieve the value for.
 * @returns {string | null} The value associated with the key, or null if the key does not exist.
 */
export const getItem = (key) => localStorage.getItem(key);

/**
 * Sets a key-value pair in localStorage.
 * @param {string} key - The key to set.
 * @param {string} value - The value to associate with the key.
 */
export const setItem = (key, value) => localStorage.setItem(key, value);

/**
 * Gets the parsed JSON value associated with the specified key from localStorage.
 * @param {string} key - The key to retrieve the value for.
 * @returns {any} The parsed JSON value associated with the key, or null if the key does not exist or the value is not valid JSON.
 */
export const getParsedItem = (key) => {
  const item = getItem(key);
  try {
    return JSON.parse(item);
  } catch (error) {
    return null;
  }
};

/**
 * Stringifies and sets a key-value pair in localStorage.
 * @param {string} key - The key to set.
 * @param {any} value - The value to stringify and associate with the key.
 */
export const setStringifyItem = (key, value) =>
  setItem(key, JSON.stringify(value));
