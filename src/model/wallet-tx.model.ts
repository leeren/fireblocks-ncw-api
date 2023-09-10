import {
  DataTypes, Model, Sequelize, Association, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey
} from 'sequelize';
import { Wallet } from './wallet.model.js';
import { Message } from './message.model.js';
import { Transaction } from './transaction.model.js';

class WalletTx extends Model<
  InferAttributes<WalletTx>,
  InferCreationAttributes<WalletTx>
> {

  declare id: CreationOptional<number>;
  declare walletId: ForeignKey<Wallet['id']> | null;
  declare transactionId: ForeignKey<Transaction['id']> | null;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare wallet?: NonAttribute<Wallet>;
  declare transaction?: NonAttribute<Transaction>;

  declare static associations: {
    wallet: Association<WalletTx, Wallet>;
    transaction: Association<WalletTx, Transaction>;
  };
}

export function initWalletTx(sequelize: Sequelize) {
	WalletTx.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			walletId: {
				type: DataTypes.INTEGER,
				allowNull: true,
				field: 'wallet_id',
			},
			transactionId: {
				type: DataTypes.INTEGER,
				allowNull: true,
				field: 'transaction_id',
			},
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
		},
		{
			tableName: 'wallet_txs',
			underscored: true,
			sequelize,
			timestamps: true,
		},
	);
}

export { WalletTx };
