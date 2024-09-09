import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@/auth/auth.guard'
import { FacilityService } from './facility.service'
import { FacilityDto } from './entities/facility.entity'
import { UpdateFacilityDto } from './dto/update-facility.dto'

@UseGuards(AuthGuard)
@Controller('facility')
@ApiTags('Facility')
export class FacilityController {
    constructor(private readonly facilityService: FacilityService) {}

    @Get('/getAll')
    public getAll(): Promise<FacilityDto[]> {
        return this.facilityService.getAll()
    }

    @Get('/getById/:id')
    public getCategoryById(@Param('id') uuid: string): Promise<FacilityDto | null> {
        return this.facilityService.getById(uuid)
    }

    @Post('/create')
    public create(@Body() createFacilityDto: FacilityDto): Promise<{}> {
        return this.facilityService.add(createFacilityDto)
    }

    @Patch('/edit/:id')
    public edit(@Param('id') uuid: string, @Body() updateFacilityDto: UpdateFacilityDto): Promise<{}> {
        return this.facilityService.update(uuid, updateFacilityDto)
    }

    @Delete('/delete')
    public delete(@Body() deleteFacilityDto: string[]): Promise<{}> {
        return this.facilityService.delete(deleteFacilityDto)
    }
}
