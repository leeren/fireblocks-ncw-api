import {
  DataTypes, Model, Sequelize, Association, InferAttributes, InferCreationAttributes, CreationOptional,
  NonAttribute, ForeignKey
} from 'sequelize';
import { User } from './user.model.js';

class Account extends Model<
  InferAttributes<Account>,
  InferCreationAttributes<Account>
> {

  declare id: CreationOptional<number>;
  declare userId: ForeignKey<User['id']>;
  declare type: string;
  declare tokenType: string;
  declare expiresIn: Date;
  declare refreshToken: string;
  declare accessToken: string;
  declare scope: string;
  declare idToken?: string;
  declare sessionState?: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare user?: NonAttribute<User>;

  declare static associations: {
    User: Association<Account, User>;
  };
}

export function initAccount(sequelize: Sequelize) {
	Account.init(
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
			type: {
				type: DataTypes.STRING(128),
				allowNull: false,
			},
			tokenType: {
				type: DataTypes.STRING(128),
				allowNull: false,
				field: 'token_type',
			},
			expiresIn: {
				type: DataTypes.DATE,
				allowNull: false,
				field: 'expires_in',
			},
			refreshToken: {
				type: DataTypes.STRING(2048),
				allowNull: false,
				field: 'refresh_token',
			},
			accessToken: {
				type: DataTypes.STRING(2048),
				allowNull: false,
				field: 'access_token',
			},
			scope: {
				type: DataTypes.STRING(512),
				allowNull: false,
				field: 'scope',
			},
			idToken: {
				type: DataTypes.STRING(2048),
				allowNull: true,
				field: 'id_token',
			},
			sessionState: {
				type: DataTypes.STRING(2048),
				allowNull: true,
				field: 'session_state',
			},
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
		},
		{
			tableName: 'accounts',
			underscored: true,
			sequelize,
			timestamps: true
		}
	);
}

export { Account };
