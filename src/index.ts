import Fastify from 'fastify';
import { FireblocksSDK } from 'fireblocks-sdk';
import cors from '@fastify/cors';
import config, { Env } from './config/index.js';
import ncwRoutes from './routes/ncw/index.js';

const fastify = Fastify({
	logger: {
		level: config.env === Env.DEV ? 'debug' : 'info',
	},
	maxParamLength: 255
});

await fastify.decorate('clients', {
	signer: new FireblocksSDK(
		config.fireblocksApiSecret,
		config.fireblocksApiNcwSigner,
		config.fireblocksApiBase
	),
	admin: new FireblocksSDK(
		config.fireblocksApiSecret,
		config.fireblocksApiNcwAdmin,
		config.fireblocksApiBase
	),
})

await fastify.register(cors, {});

fastify.register(ncwRoutes, { prefix: '/ncw', logLevel: 'warn'});

const start = async () => {
	const port = Number(process.env.NODE_PORT) || 8080;
	try {

		console.log('Establishing API server...');
		await fastify.listen(port, '0.0.0.0')

	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}

}

start();
