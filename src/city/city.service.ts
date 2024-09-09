import { Injectable, Param } from '@nestjs/common'
import { CityDto } from './entities/city.entity'
import { PrismaService } from '@/common/prisma/prisma.service'

@Injectable()
export class CityService {
    constructor(private prisma: PrismaService) {}

    public getAll(): Promise<CityDto[]> {
        return this.prisma.city.findMany()
    }
    public getStateCity(@Param('id') cId: string): Promise<CityDto[]> {
        const city = this.prisma.city.findMany({
            where: {
                stateId: cId,
            },
        })
        return city
    }
}
