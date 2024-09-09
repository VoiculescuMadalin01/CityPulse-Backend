import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsInt, IsOptional, IsNumber } from 'class-validator'

export class GeoLocalizationDto {
    @ApiProperty({ description: 'Latitude' })
    @IsNumber()
    latitude: number

    @ApiProperty({ description: 'Longitude' })
    @IsNumber()
    longitude: number
}
