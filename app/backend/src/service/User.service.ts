import UserModel from 'src/database/models/User';
import encryptPassword from 'src/auth/hash';
import generateToken from 'src/auth/generateToken';

class UserService {
  static async create(email: string, password: string) {
    const hashPassword = encryptPassword(password);
    await UserModel.create({ email, password: hashPassword });
    return generateToken(email);
  }
}

export default UserService;
