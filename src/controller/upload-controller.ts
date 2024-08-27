import { FastifyReply, FastifyRequest } from "fastify"

interface UploadRequestBody {
    image: string
    customer_code: string
    measure_datetime: string // Pode ser Date se já for um objeto Date
    measure_type: 'WATER' | 'GAS'
}

// Funçao de validação com expressão regular
const validBase64 = (str: string) => {
  const regex = /^[A-Za-z0-9+/=]+$/
  return regex.test(str)
}

export const uploadImage = async (request: FastifyRequest<{ Body: UploadRequestBody }>, reply: FastifyReply) => {
  try {
    const { image, customer_code, measure_datetime, measure_type } = request.body;

    // Validar a imagem
    if (!image || !validBase64(image)) {
      return reply.status(400).send({ message: 'Os dados fornecidos no corpo da requisição são inválidos' })
    }
  
    // Validar a data
    const measureDate = new Date(measure_datetime);
    if (isNaN(measureDate.getTime())) {
      return reply.status(400).send({ message: 'Os dados fornecidos no corpo da requisição são inválidos' })
    }

    //verificar type
    if (!['WATER', 'GAS'].includes(measure_type)) {
      return reply.status(400).send({ message: 'Os dados fornecidos no corpo da requisição são inválidos' })
    }
  
    return reply.status(200).send({ 
      message: 'Operação realizada com sucesso', 
      data: { customer_code, measureDate, measure_type } 
    });

  } catch (error) {
    request.log.error('Erro ao processar Upload: ', error)
    return reply.status(500).send({ message: 'Internal server error.' })
  }
}