import { FastifyInstance, FastifyRequest, FastifyReply} from 'fastify';
import notificationRoutes from './notifications.js';
async function ncwRoutes(fastify: FastifyInstance, opts: any) {

		fastify.register(notificationRoutes, { prefix: '/notifications', logLevel: 'warn'});

}

export default ncwRoutes;
