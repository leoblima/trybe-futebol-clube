import encryptPassword from '../auth/hash';
import generateToken from '../auth/generateToken';
import UserModel from '../database/models/User';

class UserService {
  static async create(email: string, password: string) {
    const hashPassword = encryptPassword(password);
    await UserModel.create({ email, password: hashPassword });
    return { code: 200, data: generateToken(email) };
  }

  static async findOneByEmail(email?: string) {
    const result = await UserModel.findOne({ where: { email } });
    return result;
  }
}

export default UserService;
