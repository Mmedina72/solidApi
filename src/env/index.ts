import 'dotenv/config'
import * as z from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  PORT: z.coerce.number().default(3333),
})

export const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.log('invalid Env Variables', _env.error.format())
  throw new Error('invalid Env Variables')
}

export const env = _env.data
