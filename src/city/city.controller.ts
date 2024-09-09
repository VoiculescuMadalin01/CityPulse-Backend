import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CityDto } from './entities/city.entity'
import { CityService } from './city.service'

@Controller('city')
@ApiTags('City')
export class CityController {
    constructor(private readonly cityService: CityService) {}

    @Get('/getAll')
    public getAll(): Promise<CityDto[]> {
        return this.cityService.getAll()
    }

    @Get('/getCityByStateId/:id')
    public getStatesCity(@Param('id') id: string): Promise<CityDto[]> {
        return this.cityService.getStateCity(id)
    }
}
