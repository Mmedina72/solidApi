import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { Authenticate } from '@/use-cases/authenticate'
import { InvalidCredentialsError } from '@/use-cases/errors/invalidCredentialsError'

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
    const usersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new Authenticate(usersRepository)

    await authenticateUseCase.execute({ password, email })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: err.message })
    }
    throw err
  }
  return res.status(200).send()
}
