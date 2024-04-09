import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'
import { userAlreadyExistError } from '@/use-cases/errors/user-already-exist'
import { makeRegisterUseCase } from '@/use-cases/factory/make-register-useCase'

export async function registerController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  })
  const { email, name, password } = registerSchema.parse(req.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({ name, email, password })
  } catch (err) {
    if (err instanceof userAlreadyExistError) {
      return res.status(409).send({ message: err.message })
    }
    res.status(201).send()
  }
  return res.status(201).send()
}
