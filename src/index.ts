import Fastify from 'fastify';
import cors from '@fastify/cors';
import config, { Env } from './config/index.js';

const fastify = Fastify({
	logger: {
		level: config.env === Env.DEV ? 'debug' : 'info',
	},
	maxParamLength: 255
});

await fastify.register(cors, {});

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
