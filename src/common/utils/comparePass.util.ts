import * as bcryptjs from "bcryptjs";

export function comparePass(plainText: string, hashText: string) {
  return bcryptjs.compareSync(plainText, hashText);
}
