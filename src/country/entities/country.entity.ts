import { ApiProperty } from '@nestjs/swagger'
import { JsonValue } from '@prisma/client/runtime/library'

export class CountryDto {
    @ApiProperty()
    name!: string

    @ApiProperty()
    iso3!: string

    @ApiProperty()
    iso2!: string

    @ApiProperty()
    numericCode!: string

    @ApiProperty()
    phoneCode!: string

    @ApiProperty()
    capital!: string

    @ApiProperty()
    currency!: string

    @ApiProperty()
    currencyName!: string

    @ApiProperty()
    currencySymbol!: string

    @ApiProperty()
    tld!: string

    @ApiProperty()
    native!: string

    @ApiProperty()
    region!: string

    @ApiProperty()
    regionId!: string

    @ApiProperty()
    subregion!: string

    @ApiProperty()
    subregionId!: string

    @ApiProperty()
    nationality!: string

    @ApiProperty({ type: Object, required: false })
    timezones?: JsonValue

    @ApiProperty({ type: Object, required: false })
    translations?: JsonValue

    @ApiProperty()
    latitude!: number

    @ApiProperty()
    longitude!: number

    @ApiProperty()
    emoji!: string

    @ApiProperty()
    emojiU!: string

    constructor(partial: Partial<CountryDto>) {
        Object.assign(this, partial)
    }
}
