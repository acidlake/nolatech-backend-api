/**
 * Checks if a given password has a valid length.
 *
 * @param {string} password - The password to check.
 * @returns {boolean} - Returns true if the password length is valid, otherwise false.
 */
export function checkPasswordLength(password: string): boolean {
  if (!password) return false;

  if (password.length < 6 || password.length > 20) {
    return false;
  }

  return true;
}
