import fastify from "fastify";
import { routes } from "./routes/routes.js";


const app = fastify({ logger: true })
const PORT = 3333
  

// Iniciando o servidor
const start = async () => {

    // carregar as rotas
    await app.register(routes)

    try {
      await app.listen({ port: PORT });
      console.log(`Server is running at http://localhost:${PORT}`);
    } catch (err) {
      app.log.error(err);
      process.exit(1);
    }
  };
  
  start();