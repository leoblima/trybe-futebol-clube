import { genSaltSync, hashSync } from 'bcryptjs';

function encryptPassword(password: string): string {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  return hash;
}

export default encryptPassword;
