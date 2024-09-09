import { ApiProperty } from '@nestjs/swagger'

export class SubcategoryDto {
    @ApiProperty()
    name!: string
    @ApiProperty()
    description!: string | null
    @ApiProperty()
    isEnable!: boolean
    @ApiProperty()
    categoryUuid!: string

    constructor(partial: Partial<SubcategoryDto>) {
        Object.assign(this, partial)
    }
}
