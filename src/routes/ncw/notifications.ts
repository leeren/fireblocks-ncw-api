import { FastifyInstance, FastifyRequest, FastifyReply} from 'fastify';

import config from '../../config/index.js';

import { NotificationBody } from './types.js';

async function ncwNotificationRoutes(fastify: FastifyInstance, opts: any) {

	fastify.post('/', opts, async (
		req: FastifyRequest<{ Body: NotificationBody }>,
		reply: FastifyReply
	) => {
		try {

			const response = { status: "OK" };
			return reply.status(200).send(response);

    } catch (error) {
			fastify.log.error({
				message: `NCW notifications polling unexpectedly failed: ${error}`,
			});
      return reply.status(500).send({
        error: "Internal Server Error"
      });
    }
  });

}

export default ncwNotificationRoutes;
