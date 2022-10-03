import { DataTypes, Model } from 'sequelize';
import db from '.';

class TeamsModel extends Model {
  public id: number;
  public teamName!: string;
}

TeamsModel.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: new DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});

export default TeamsModel;
