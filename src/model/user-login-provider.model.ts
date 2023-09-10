import {
  DataTypes, Model, Sequelize, Association, CreationOptional,
  InferCreationAttributes, InferAttributes
} from 'sequelize';
import { User } from './user.model.js';
import { LoginProvider } from './login-provider.model.js';

class UserLoginProvider extends Model<
  InferAttributes<UserLoginProvider>,
  InferCreationAttributes<UserLoginProvider>
> {

  declare id: CreationOptional<number>;
  declare userId: number;
  declare loginProviderId: number;
  declare providerAccountId: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare static associations: {
    user: Association<UserLoginProvider, User>;
    loginProvider: Association<UserLoginProvider, LoginProvider>;
  };
}

export function initUserLoginProvider(sequelize: Sequelize) {
	UserLoginProvider.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				field: 'user_id',
			},
			loginProviderId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				field: 'login_provider_id',
			},
			providerAccountId: {
				type: DataTypes.STRING(128),
				allowNull: false,
				field: 'provider_account_id',
			},
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE
		},
		{
			tableName: 'user_login_providers',
			underscored: true,
			sequelize,
			timestamps: true,
		},
	);
}

export { UserLoginProvider };
