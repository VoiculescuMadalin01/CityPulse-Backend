export interface IStatesSeedData {
    uuid: string
    name: string
    countryId: string
    countryCode: string
    countryName: string
    stateCode: string | null
    type?: string | null
    latitude: number | null
    longitude: number | null
}
