import { genSaltSync, hashSync, compare } from 'bcryptjs';

function encryptPassword(password: string): string {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  return hash;
}

async function comparePassword(password: string, hash: string): Promise<boolean> {
  const isEqual = compare(password, hash).then((isValid) => isValid);
  return isEqual;
}

export { comparePassword };

export default encryptPassword;
