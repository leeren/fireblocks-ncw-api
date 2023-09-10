import {
  DataTypes, Model, Sequelize, Association, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute
} from 'sequelize';
import { ProductGateway } from './product-gateway.model.js';
import { WalletTx } from './wallet-tx.model.js';

class Transaction extends Model<
  InferAttributes<Transaction, { omit: 'walletTxs' }>,
  InferCreationAttributes<Transaction, { omit: 'walletTxs' }>
> {

  declare id: CreationOptional<number>;

	declare status: CreationOptional<string>;
	declare details: CreationOptional<any>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

	declare walletTxs?: NonAttribute<WalletTx[]>;

  declare static associations: {
		walletTxs: Association<Transaction, WalletTx>;
  };
}

export function initTransaction(sequelize: Sequelize) {
	Transaction.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			status: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			details: {
				type: DataTypes.JSON,
				allowNull: true,
			},
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
		},
		{
			tableName: 'transactions',
			underscored: true,
			sequelize,
			timestamps: true
		}
	);
}

export { Transaction };
