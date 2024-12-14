/**
 * Asserts whether the condition is true and throws an error if it's false.
 * @param condition - The condition to assert.
 * @param error - A custom error or the reason you expect the assertion to be true.
 * @throws An error with the given message if the condition is false.
 */
export function assert(
  condition: boolean,
  error: Error | string,
): asserts condition {
  if (!condition) throw error instanceof Error ? error : new Error(error);
}
