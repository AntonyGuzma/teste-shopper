import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { uploadImage } from "../controller/upload-controller";

// Definição da rotas
export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    
    // Rota para realizar upload da imagem
    fastify.post("/upload", uploadImage)

    // Rota padrão para não encontrado (404)
    fastify.setNotFoundHandler((request, reply) => {
        reply.status(404).send({ error: "Rota não encontrada" });
    });
}