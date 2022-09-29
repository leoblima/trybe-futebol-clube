import { DataTypes, Model } from 'sequelize';
import db from '.';

class UserModel extends Model {
  public id: number;
  public username!: string;
  public role!: string;
  public email!: string;
  public password!: string;
}

UserModel.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: new DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: new DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: new DataTypes.STRING(255),
    allowNull: false,
  },
  password: {
    type: new DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'user',
  timestamps: false,
  underscored: true,
});

export default UserModel;
