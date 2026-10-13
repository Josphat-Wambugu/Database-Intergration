import argon2 from 'argon2';

/**
 * Hash a plain-text password for storage. Uses argon2id (the current
 * recommended default), so the same plain-text password produces a
 * different hash every time — never compare these with ===.
 *
 * @param {string} plainPassword
 * @returns {Promise<string>} the hash to store in the database
 */
export const hashPassword = async (plainPassword) => {
  return argon2.hash(plainPassword, { type: argon2.argon2id });
};

/**
 * Verify a plain-text password against a stored hash.
 *
 * @param {string} hash - the value stored in the database
 * @param {string} plainPassword - the value supplied by the user
 * @returns {Promise<boolean>}
 */
export const verifyPassword = async (hash, plainPassword) => {
  try {
    return await argon2.verify(hash, plainPassword);
  } catch (error) {
    // argon2.verify throws on a malformed hash rather than returning false
    console.error('Error verifying password:', error);
    return false;
  }
};
