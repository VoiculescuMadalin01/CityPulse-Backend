import { JsonValue } from '@prisma/client/runtime/library'

export interface CountryDtoSeedData {
    uuid: string
    name: string
    iso3: string
    iso2: string
    numericCode: string
    phoneCode: string
    capital: string
    currency: string
    currencyName: string
    currencySymbol: string
    tld: string
    native: string
    region: string
    regionId: string
    subregion: string
    subregionId: string
    nationality: string
    timezones: JsonValue | null
    translations: JsonValue | null
    latitude: number
    longitude: number
    emoji: string
    emojiU: string
}
