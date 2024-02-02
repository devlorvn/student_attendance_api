import * as bcryptjs from "bcryptjs";

/**
 * Compare text and hash text using bcrypt
 * @param plainText
 * @param hashText
 * @returns Boolean
 */
export function comparePass(plainText: string, hashText: string) {
  return bcryptjs.compareSync(plainText, hashText);
}
