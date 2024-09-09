import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { CountryService } from './country.service'
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CountryDto } from './entities/country.entity'
import { AuthGuard } from '@/auth/auth.guard'

@Controller('country')
@ApiTags('Country')
export class CountryController {
    constructor(private readonly countryService: CountryService) {}

    @Get('/getAll')
    public getAll(): Promise<CountryDto[]> {
        return this.countryService.getAll()
    }
}
