import { expect, describe, it, beforeEach } from 'vitest'
import { CheckInUseCase } from '@/use-cases/checkin'
import { inMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkIns-repository'

let checkInsRepository: inMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new inMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
