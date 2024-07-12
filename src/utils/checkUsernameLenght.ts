/**
 * Checks if a given username has a valid length.
 *
 * @param {string} username - The username to check.
 * @returns {boolean} - Returns true if the username length is valid, otherwise false.
 */
export function checkUserNameLength(username: string): boolean {
  if (!username) return false;

  if (username.length < 4 || username.length > 30) {
    return false;
  }

  return true;
}
