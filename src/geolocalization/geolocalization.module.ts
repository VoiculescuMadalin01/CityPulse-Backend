import { Module } from '@nestjs/common'
import { PrismaModule } from '@/common/prisma/prisma.module'
import { GeoLocalizationController } from './geolocalization.controller'
import { GeoLocalizationService } from './geolocalization.service'

@Module({
    imports: [PrismaModule],
    controllers: [GeoLocalizationController],
    providers: [GeoLocalizationService],
    exports: [GeoLocalizationService],
})
export class GeoLocalizationModule {}
