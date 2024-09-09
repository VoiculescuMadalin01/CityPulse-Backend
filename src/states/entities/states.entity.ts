import { IsString, IsInt, IsOptional, IsNumber } from 'class-validator'

export class StatesDto {
    @IsString()
    name: string

    @IsString()
    countryId: string

    @IsString()
    countryCode: string

    @IsString()
    countryName: string

    @IsOptional()
    @IsString()
    stateCode?: string

    @IsOptional()
    @IsString()
    type?: string

    @IsOptional()
    @IsNumber()
    latitude?: number

    @IsOptional()
    @IsNumber()
    longitude?: number
}
