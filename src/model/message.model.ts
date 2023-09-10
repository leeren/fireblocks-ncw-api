import {
  DataTypes, Model, Sequelize, Association, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey
} from 'sequelize';
import { ProductGateway } from './product-gateway.model.js';

class Message extends Model<
  InferAttributes<Message>,
  InferCreationAttributes<Message>
> {

  declare id: CreationOptional<number>;
  declare productGatewayId: ForeignKey<ProductGateway['id']> | null;
	declare physicalDeviceId: CreationOptional<string>;
	declare message: CreationOptional<string>;
	declare lastSeen: CreationOptional<string>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare productGateway?: NonAttribute<ProductGateway>;

  declare static associations: {
    productGateway: Association<Message, ProductGateway>;
  };
}

export function initMessage(sequelize: Sequelize) {
	Message.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			productGatewayId: {
				type: DataTypes.INTEGER,
				allowNull: true,
				field: 'product_gateway_id',
			},
			physicalDeviceId: {
				type: DataTypes.INTEGER,
				allowNull: true,
				field: 'physical_device_id',
			},
			message: {
				type: DataTypes.TEXT,
				allowNull: true,
				field: 'message',
			},
			lastSeen: {
				type: DataTypes.DATE,
				allowNull: true,
				field: 'last_seen',
			},
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
		},
		{
			tableName: 'messages',
			underscored: true,
			sequelize,
			timestamps: true,
		},
	);
}

export { Message };
