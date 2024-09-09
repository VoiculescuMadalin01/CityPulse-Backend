import { Injectable, Param } from '@nestjs/common'
import { PrismaService } from '@/common/prisma/prisma.service'
import { GeoLocalizationDto } from './entities/geolocalization.entity'

@Injectable()
export class GeoLocalizationService {
    constructor(private prisma: PrismaService) {}

    public async findUserCloseCountry(userGeolocation: GeoLocalizationDto) {
        const { latitude: userLat, longitude: userLng } = userGeolocation
        const closeCountry = await this.prisma.country.findMany({
            select: {
                uuid: true,
                latitude: true,
                longitude: true,
            },
        })
        return closeCountry
    }
}
