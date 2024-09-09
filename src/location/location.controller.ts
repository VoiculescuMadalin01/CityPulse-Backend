import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    UploadedFile,
    UseGuards,
    Request,
} from '@nestjs/common'
import { LocationService } from './location.service'
import { LocationDto } from './entities/location.entity'
import { ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { SupabaseService } from '@/common/supabase/supabase.service'
import { AuthGuard } from '@/auth/auth.guard'
import { AuthenticatedRequest } from '@/user/interfaces/user.interface'

@Controller('location')
@ApiTags('Location')
export class LocationController {
    constructor(
        private readonly locationService: LocationService,
        private supabaseService: SupabaseService,
    ) {}

    @Get('getAll')
    getAll() {
        return this.locationService.getAll()
    }

    @Get('/getById/:id')
    getSubCategoryById(@Param('id') uuid: string): Promise<LocationDto | null> {
        return this.locationService.getById(uuid)
    }

    @UseGuards(AuthGuard)
    @Post('/createEmptyLocation')
    createEmptyLocation(@Request() req: AuthenticatedRequest) {
        return this.locationService.createEmptyLocation(req)
    }

    @Post('edit/:id/locationProfile')
    async updateLocationProfile(
        @Param('id') uuid: string,
        @Body() locationProfileDto: { name: string; base64: string },
    ) {
        return this.locationService.updateLocationProfile(uuid, locationProfileDto)
    }

    @Post('edit/:id/locationsImages')
    async updateLocationsImages(
        @Param('id') uuid: string,
        @Body() locationProfileDto: { name: string; base64: string }[],
    ) {
        return this.locationService.updateLocationImages(uuid, locationProfileDto)
    }

    @Post('delete/:id/locationProfile')
    async deleteLocationProfile(@Param('id') uuid: string) {
        return this.locationService.deleteLocationProfile(uuid)
    }

    @Post('delete/:id/locationImage')
    async deleteLocationImage(@Param('id') uuid: string, @Body() body: { fileName: string }) {
        return this.locationService.deleteLocationImage(uuid, body)
    }

    @Patch('edit/:id')
    public edit(@Param('id') uuid: string, @Body() updateLocationDto: LocationDto): Promise<{}> {
        return this.locationService.update(uuid, updateLocationDto)
    }

    @Delete('/delete')
    delete(@Body() deleteLocationsDto: string[]): Promise<{}> {
        return this.locationService.delete(deleteLocationsDto)
    }
}
