/**
 * Checks if a given email is valid.
 *
 * @param {string} email - The email to validate.
 * @returns {boolean} - Returns true if the email is valid, otherwise false.
 */
export function checkEmailValidity(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
