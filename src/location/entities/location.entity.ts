import { IsString, IsOptional, IsArray, IsNumber, IsDate, IsUUID } from 'class-validator'
import { Type } from 'class-transformer'

export class LocationDto {
    @IsUUID()
    uuid: string

    @IsUUID()
    user_uuid: string

    @IsString()
    name: string

    @IsString()
    description: string

    @IsString()
    address: string

    @IsString()
    latitude: string

    @IsString()
    longitude: string

    @IsOptional()
    @IsString()
    presentationImage?: string

    @IsArray()
    @IsString({ each: true })
    locationImages: string[]

    @IsUUID()
    cityId: string

    @IsUUID()
    stateId: string

    @IsUUID()
    countryId: string

    @IsNumber()
    total_likes: number

    @IsNumber()
    total_dislike: number

    @IsDate()
    @Type(() => Date)
    createdAt: Date

    @IsDate()
    @Type(() => Date)
    updatedAt: Date
}
