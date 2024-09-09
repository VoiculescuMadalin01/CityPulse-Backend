import { ApiProperty } from '@nestjs/swagger'
import { JsonValue } from '@prisma/client/runtime/library'
import { IsString, IsInt, IsOptional, IsNumber } from 'class-validator'

export class CityDto {
    @IsString()
    uuid: string

    @IsString()
    name: string

    @IsString()
    stateId: string

    @IsString()
    stateCode: string

    @IsString()
    stateName: string

    @IsString()
    countryId: string

    @IsString()
    countryCode: string

    @IsString()
    countryName: string

    @IsOptional()
    @IsNumber()
    latitude?: number

    @IsOptional()
    @IsNumber()
    longitude?: number

    @IsOptional()
    @IsString()
    wikiDataId?: string
}
