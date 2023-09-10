import { Sequelize } from 'sequelize';
import config from '../config/index.js';

const dbPortNumber: number = config.dbPort;

const sequelize = new Sequelize({
    host: config.dbHost,
    port: dbPortNumber,
    username: config.dbUsername,
    password: config.dbPassword,
    database: config.dbName,
    dialect: 'postgres'
});

export { Sequelize, sequelize };

export { Account } from './account.model.js';
export { Message } from './message.model.js';
export { Transaction } from './transaction.model.js';
export { User } from './user.model.js';
export { LoginProvider } from './login-provider.model.js';
export { ProductGateway } from './product-gateway.model.js';
export { Wallet } from './wallet.model.js';
export { WalletTx } from './wallet-tx.model.js';
export { UserLoginProvider } from './user-login-provider.model.js';

export { ProductGatewayType } from './enums.js';
