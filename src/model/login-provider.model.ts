import {
  DataTypes, Model, Sequelize, Association, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute
} from 'sequelize';
import { UserLoginProvider } from './user-login-provider.model.js';

class LoginProvider extends Model<
  InferAttributes<LoginProvider, { omit: 'userLoginProviders' }>,
  InferCreationAttributes<LoginProvider, { omit: 'userLoginProviders' }>
> {

  declare id: CreationOptional<number>;
  declare name: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare userLoginProviders?: NonAttribute<UserLoginProvider[]>;

  declare static associations: {
    userLoginProviders: Association<LoginProvider, UserLoginProvider>;
  };
}

export function initLoginProvider(sequelize: Sequelize) {
	LoginProvider.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING(128),
				allowNull: false,
				unique: true
			},
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
		},
		{
			tableName: 'login_providers',
			underscored: true,
			sequelize,
			timestamps: true
		}
	);
}

export { LoginProvider };
