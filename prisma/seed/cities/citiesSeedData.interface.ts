export interface ICitiesSeedData {
    uuid: string
    name: string
    stateId: string
    stateCode: string
    stateName: string
    countryId: string
    countryCode: string
    countryName: string
    latitude?: number | null
    longitude?: number | null
    wikiDataId?: string | null
}
