import {
  DataTypes, Model, Sequelize, Association, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute
} from 'sequelize';
import { ProductGateway } from './product-gateway.model.js';
import { WalletTx } from './wallet-tx.model.js';
import { User } from './user.model.js';

class Wallet extends Model<
  InferAttributes<Wallet, { omit: 'productGateways' | 'walletTxs' }>,
  InferCreationAttributes<Wallet, { omit: 'productGateways' | 'walletTxs' }>
> {

  declare id: CreationOptional<number>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

	declare productGateways?: NonAttribute<ProductGateway[]>;
	declare walletTxs?: NonAttribute<WalletTx[]>;

  declare static associations: {
		productGateways: Association<Wallet, ProductGateway>;
		walletTxs: Association<Wallet, WalletTx>;
  };
}

export function initWallet(sequelize: Sequelize) {
	Wallet.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
		},
		{
			tableName: 'wallets',
			underscored: true,
			sequelize,
			timestamps: true
		}
	);
}

export { Wallet };
