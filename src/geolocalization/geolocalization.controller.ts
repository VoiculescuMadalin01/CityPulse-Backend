import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { GeoLocalizationService } from './geolocalization.service'
import { ApiTags } from '@nestjs/swagger'
import { GeoLocalizationDto } from './entities/geolocalization.entity'

@Controller('geolocalization')
@ApiTags('Geolocalization')
export class GeoLocalizationController {
    constructor(private readonly geoLocalizationService: GeoLocalizationService) {}

    @Post('/findUserCloseCountry')
    public getAll(@Body() userGeolocation: GeoLocalizationDto) {
        return this.geoLocalizationService.findUserCloseCountry(userGeolocation)
    }
}
