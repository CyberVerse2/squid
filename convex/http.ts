import { HttpRouter, httpRouter } from 'convex/server';
import { webhookHandler } from './user';

const http = httpRouter();

http.route({
  path: '/webhook',
  method: 'POST',
  handler: webhookHandler
});

export default http;
