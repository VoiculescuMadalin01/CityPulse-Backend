import { Injectable, Param } from '@nestjs/common'
import { StatesDto } from './entities/states.entity'
import { PrismaService } from '@/common/prisma/prisma.service'

@Injectable()
export class StatesService {
    constructor(private prisma: PrismaService) {}

    public getAll(): Promise<StatesDto[]> {
        return this.prisma.states.findMany()
    }
    public getCountryStates(@Param('id') cId: string): Promise<StatesDto[]> {
        const states = this.prisma.states.findMany({
            where: {
                countryId: cId,
            },
        })
        return states
    }
}
