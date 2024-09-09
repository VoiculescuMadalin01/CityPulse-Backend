import { AuthModule } from '@/auth/auth.module'
import { CityModule } from '@/city/city.module'
import { PrismaModule } from '@/common/prisma/prisma.module'
import { CountryModule } from '@/country/country.module'
import { FacilityModule } from '@/facility/facility.module'
import { GeoLocalizationModule } from '@/geolocalization/geolocalization.module'
import { LocationModule } from '@/location/location.module'
import { StatesModule } from '@/states/states.module'
import { SubcategoryModule } from '@/subcategory/subcategory.module'
import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'

@Module({
    imports: [
        AuthModule,
        CountryModule,
        StatesModule,
        CityModule,
        GeoLocalizationModule,
        FacilityModule,
        PrismaModule,
        LocationModule,
        SubcategoryModule,
        MulterModule.register({
            dest: './uploads',
        }),
    ],
})
export class AppModule {}
