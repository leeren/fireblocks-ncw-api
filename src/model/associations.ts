import { Sequelize } from 'sequelize';
import { sequelize } from './index.js';

import { Account, initAccount } from './account.model.js';
import { LoginProvider, initLoginProvider } from './login-provider.model.js';
import { Message, initMessage } from './message.model.js';
import { ProductGateway, initProductGateway } from './product-gateway.model.js';
import { Transaction, initTransaction } from './transaction.model.js';
import { UserLoginProvider, initUserLoginProvider } from './user-login-provider.model.js';
import { User, initUser } from './user.model.js';
import { Wallet, initWallet } from './wallet.model.js';
import { WalletTx, initWalletTx } from './wallet-tx.model.js';

const setupAssociations = (sequelize: Sequelize) => {

	initAccount(sequelize);
	initLoginProvider(sequelize);
	initMessage(sequelize);
	initProductGateway(sequelize);
	initTransaction(sequelize);
	initUser(sequelize);
	initUserLoginProvider(sequelize);
	initWallet(sequelize);
	initWalletTx(sequelize);

	Account.belongsTo(User, {
		foreignKey: 'user_id',
		as: 'user',
	});

	LoginProvider.hasMany(UserLoginProvider, {
		foreignKey: 'login_provider_id',
		as: 'userLoginProviders',
	});

	Message.belongsTo(ProductGateway, {
		foreignKey: 'product_gateway_id',
		as: 'productGatewayId',
	});

	ProductGateway.belongsTo(User, {
		foreignKey: 'owner_id',
		as: 'owner',
	});

	ProductGateway.belongsTo(Wallet, {
		foreignKey: 'wallet_id',
		as: 'wallet',
	});

	ProductGateway.hasMany(Message, {
		foreignKey: 'product_gateway_id',
		as: 'messages',
	});

	Transaction.hasMany(WalletTx, {
		foreignKey: 'transaction_id',
		as: 'walletTxs',
	});

	UserLoginProvider.belongsTo(User, {
		foreignKey: 'user_id',
		as: 'user',
	});

	UserLoginProvider.belongsTo(LoginProvider, {
		foreignKey: 'login_provider_id',
		as: 'loginProvider',
	});

	User.hasMany(ProductGateway, {
		foreignKey: 'owner_id',
		as: 'ownedProductGateways',
	});

	User.hasMany(UserLoginProvider, {
		foreignKey: 'user_id',
		as: 'userLoginProviders',
	});

	Wallet.hasMany(ProductGateway, {
		foreignKey: 'wallet_id',
		as: 'productGateways',
	});

	Wallet.hasMany(WalletTx, {
		foreignKey: 'wallet_id',
		as: 'walletTxs',
	});


	WalletTx.belongsTo(Transaction, {
		foreignKey: 'transaction_id',
		as: 'transaction',
	});

	WalletTx.belongsTo(Wallet, {
		foreignKey: 'wallet_id',
		as: 'wallet',
	});

};

export { setupAssociations };
