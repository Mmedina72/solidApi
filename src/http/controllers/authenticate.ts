import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'
import { InvalidCredentialsError } from '@/use-cases/errors/invalidCredentialsError'
import { makeAuthenticateUseCase } from '@/use-cases/factory/make-authenticate-useCase'

export async function authenticateController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const authenticateSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = authenticateSchema.parse(req.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    await authenticateUseCase.execute({ password, email })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: err.message })
    }
    throw err
  }
  return res.status(200).send()
}
