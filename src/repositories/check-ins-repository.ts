import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInRepository {
  create(checkIn: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
