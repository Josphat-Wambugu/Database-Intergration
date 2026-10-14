import argon2 from 'argon2';


export const hashPassword = async (plainPassword) => {
  return argon2.hash(plainPassword, { type: argon2.argon2id });
};



export const verifyPassword = async (hash, plainPassword) => {
  try {
    return await argon2.verify(hash, plainPassword);
  } catch (error) {
    // argon2.verify throws on a malformed hash rather than returning false
    console.error('Error verifying password:', error);
    return false;
  }
};
