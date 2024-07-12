const bcrypt = require("bcryptjs");

/**
 * Hashes a password using bcrypt.
 *
 * @param {string} password - The password to hash.
 * @returns {string} - The hashed password.
 */
function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export default hashPassword;
