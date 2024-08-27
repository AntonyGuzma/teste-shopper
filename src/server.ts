import fastify from "fastify";
import { FastifyInstance, FastifyPluginOptions } from "../node_modules/fastify/fastify";


const app = fastify({ logger: true })
const PORT = 3333

// Declare uma rota
app.get('/', async (request , reply) => {
    return { hello: 'Mundas' }
  })
  
// Iniciando o servidor
const start = async () => {

    try {
      await app.listen({ port: PORT });
      console.log(`Server is running at http://localhost:${PORT}`);
    } catch (err) {
      app.log.error(err);
      process.exit(1);
    }
  };
  
  start();