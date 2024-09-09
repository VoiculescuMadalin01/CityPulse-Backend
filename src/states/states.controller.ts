import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { StatesService } from './states.service'
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger'
import { StatesDto } from './entities/states.entity'
import { AuthGuard } from '@/auth/auth.guard'

@Controller('state')
@ApiTags('States')
export class StatesController {
    constructor(private readonly statesService: StatesService) {}

    @Get('/getAll')
    public getAll(): Promise<StatesDto[]> {
        return this.statesService.getAll()
    }

    @Get('/getStatesByCountryId/:id')
    public getCountryStates(@Param('id') id: string): Promise<StatesDto[]> {
        return this.statesService.getCountryStates(id)
    }
}
