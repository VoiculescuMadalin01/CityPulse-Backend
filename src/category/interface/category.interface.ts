import { ApiProperty } from '@nestjs/swagger'

export class CategoryDto {
    @ApiProperty({ description: 'Name' })
    name!: string

    @ApiProperty({ description: 'Description' })
    description!: string | null

    @ApiProperty({ description: 'Description' })
    isEnable!: boolean
}

export class CategoryCreateDto {
    @ApiProperty({ description: 'Name' })
    name!: string

    @ApiProperty({ description: 'Description' })
    description!: string | null

    @ApiProperty({ description: 'Description' })
    isEnable!: boolean
}

export class CategoryUpdateDto {
    @ApiProperty({ description: 'Name' })
    name!: string

    @ApiProperty({ description: 'Description' })
    description!: string | null

    @ApiProperty({ description: 'Description' })
    isEnable!: boolean
}
