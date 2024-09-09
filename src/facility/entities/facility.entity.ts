import { ApiProperty } from '@nestjs/swagger'

export class FacilityDto {
    @ApiProperty()
    name!: string

    @ApiProperty()
    isEnable!: boolean

    @ApiProperty()
    icon!: string | null

    constructor(partial: Partial<FacilityDto>) {
        Object.assign(this, partial)
    }
}
