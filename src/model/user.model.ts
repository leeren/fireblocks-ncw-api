import {
  DataTypes, Model, Sequelize, Association, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute
} from 'sequelize';
import { ProductGateway } from './product-gateway.model.js';
import { UserLoginProvider } from './user-login-provider.model.js';

class User extends Model<
  InferAttributes<User, { omit: 'ownedProductGateways' }>,
  InferCreationAttributes<User, { omit: 'ownedProductGateways' }>
> {

  declare id: CreationOptional<number>;
	declare name: CreationOptional<string>;
  declare email: string | null;
	declare image: CreationOptional<string>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

	declare userLoginProviders?: NonAttribute<UserLoginProvider>[];
	declare ownedProductGateways?: NonAttribute<ProductGateway[]>;

  declare static associations: {
		ownedProductGateways: Association<User, ProductGateway>;
		userLoginProviders: Association<User, UserLoginProvider>;
  };
}

export function initUser(sequelize: Sequelize) {
	User.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING(128),
				allowNull: true,
			},
			image: {
				type: DataTypes.STRING(2048),
				allowNull: true,
			},
			email: {
				type: DataTypes.STRING(128),
				allowNull: true,
				unique: true
			},
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
		},
		{
			tableName: 'users',
			underscored: true,
			sequelize,
			timestamps: true
		}
	);
}

export { User };
