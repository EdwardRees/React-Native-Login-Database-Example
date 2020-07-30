// Simple Utilities api file for all utility based functions

/**
 * Caesar Shift value
 */
const SHIFT: number = 10;

/** Encryption using a simple caesar shift */
const encrypt = (str: string): string => {
  let encrypted = "";
  for (let chr of str) {
    encrypted += String.fromCharCode(chr.charCodeAt(0) + SHIFT);
  }
  return encrypted;
};

/** Decryption using simple caesar shift */
const decrypt = (str: string): string => {
  let encrypted = "";
  for (let chr of str) {
    encrypted += String.fromCharCode(chr.charCodeAt(0) - SHIFT);
  }
  return encrypted;
};

// Export both as accessible functions
export { encrypt, decrypt };
