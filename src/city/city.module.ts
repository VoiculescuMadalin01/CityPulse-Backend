import { Module } from '@nestjs/common'
import { PrismaModule } from '@/common/prisma/prisma.module'
import { CityController } from './city.controller'
import { CityService } from './city.service'

@Module({
    imports: [PrismaModule],
    controllers: [CityController],
    providers: [CityService],
    exports: [CityService],
})
export class CityModule {}
