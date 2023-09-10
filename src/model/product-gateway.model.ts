import {
  DataTypes, Model, Sequelize, Association, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey
} from 'sequelize';
import { ProductGatewayType } from './enums.js';
import { User } from './user.model.js';
import { Message } from './message.model.js';
import { Wallet } from './wallet.model.js';

class ProductGateway extends Model<
  InferAttributes<ProductGateway>,
  InferCreationAttributes<ProductGateway>
> {

  declare id: CreationOptional<number>;
  declare ownerId: ForeignKey<User['id']> | null;
  declare walletId: ForeignKey<Wallet['id']> | null;
	declare type: ProductGatewayType;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare owner?: NonAttribute<User>;
  declare wallet?: NonAttribute<Wallet>;
	declare messages?: NonAttribute<Message[]>;

  declare static associations: {
    owner: Association<ProductGateway, User>;
    wallet: Association<ProductGateway, Wallet>;
    messages: Association<ProductGateway, Message>;
  };
}

export function initProductGateway(sequelize: Sequelize) {
	ProductGateway.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			ownerId: {
				type: DataTypes.INTEGER,
				allowNull: true,
				field: 'owner_id',
			},
			walletId: {
				type: DataTypes.INTEGER,
				allowNull: true,
				field: 'wallet_id',
			},
			type: {
				type: DataTypes.ENUM(ProductGatewayType.CHIP, ProductGatewayType.MOBILE),
				allowNull: false,
				defaultValue: ProductGatewayType.MOBILE,
			},
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
		},
		{
			tableName: 'product_gateways',
			underscored: true,
			sequelize,
			timestamps: true,
		},
	);
}

export { ProductGateway };
