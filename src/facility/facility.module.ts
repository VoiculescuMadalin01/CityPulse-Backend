import { Module } from '@nestjs/common'
import { PrismaModule } from '@/common/prisma/prisma.module'
import { FacilityController } from './facility.controller'
import { FacilityService } from './facility.service'

@Module({
    imports: [PrismaModule],
    controllers: [FacilityController],
    providers: [FacilityService],
    exports: [FacilityService],
})
export class FacilityModule {}
