import { PrismaClient } from '@prisma/client'
import { seedUsers } from './user/user'
import { seedCategories } from './category/category'
import { seedFacilities } from './facility/facility'

import { IUserSeedData } from './user/userSeedData.interface'
import { CountryDtoSeedData } from './countries/countriesSeedData.interface'
import { IStatesSeedData } from './states/statesSeedData.interface'
import { ICategorySeedData } from './category/categorySeed.interface'

import fs from 'fs'
import csv from 'csv-parser'
import path from 'path'
import { ICitiesSeedData } from './cities/citiesSeedData.interface'
import { IFacilitySeedData } from './facility/facilitySeed.interface'

const prisma: PrismaClient = new PrismaClient()

async function readCSV(filePath: string): Promise<any[]> {
    return new Promise((resolve: any, reject: any) => {
        const results: any[] = []
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data: any) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error: any) => reject(error))
    })
}

async function performUserMigration(prisma: PrismaClient, seedData: IUserSeedData[]): Promise<void> {
    const start: DOMHighResTimeStamp = performance.now()

    try {
        const users: IUserSeedData[] = await prisma.user.findMany()

        if (users.length === 0) {
            await prisma.$transaction(
                seedData.map((user: IUserSeedData) =>
                    prisma.user.create({
                        data: user,
                    }),
                ),
            )
            const end: DOMHighResTimeStamp = performance.now()
            const duration: number = (end - start) / 1000
            process.stdout.write(` ✔ Migration User completed in ${duration.toFixed(2)} seconds\r\n`)
        } else {
            process.stdout.write(' -> Users table already populated ✔ \r\n')
        }
    } catch (error) {
        const end: DOMHighResTimeStamp = performance.now()
        const duration: number = (end - start) / 1000 // convert milliseconds to seconds
        process.stdout.write(` ✘ Migration User failed after ${duration.toFixed(2)} seconds\r\n`)
        console.error(error)
    }
}

async function performCountriesMigration(prisma: PrismaClient, filePath: string): Promise<void> {
    const start: DOMHighResTimeStamp = performance.now()
    const batchSize: number = 100

    try {
        const csvFile: string = path.resolve(__dirname, filePath)

        const countries: CountryDtoSeedData[] = await prisma.country.findMany()

        if (countries.length === 0) {
            const seedData: CountryDtoSeedData[] = await readCSV(csvFile)

            for (let i: number = 0; i < seedData.length; i += batchSize) {
                const batchNumber: number = Math.floor(i / batchSize) + 1
                console.log(
                    `-> Countries: Start processing batch number ${batchNumber} (processing records ${i + 1} to ${seedData.length})`,
                )
                const batch: CountryDtoSeedData[] = seedData.slice(i, i + batchSize)
                await prisma.$transaction(
                    batch.map((country: CountryDtoSeedData) =>
                        prisma.country.create({
                            data: {
                                uuid: country.uuid,
                                name: country.name,
                                iso3: country.iso3,
                                iso2: country.iso2,
                                numericCode: country.numericCode,
                                phoneCode: country.phoneCode,
                                capital: country.capital,
                                currency: country.currency,
                                currencyName: country.currencyName,
                                currencySymbol: country.currencySymbol,
                                tld: country.tld,
                                native: country.native,
                                region: country.region,
                                regionId: country.regionId,
                                subregion: country.subregion,
                                subregionId: country.subregionId,
                                nationality: country.nationality,
                                timezones: country.timezones || undefined,
                                translations: country.translations || undefined,
                                latitude: Number(country.latitude),
                                longitude: Number(country.longitude),
                                emoji: country.emoji,
                                emojiU: country.emojiU,
                            },
                        }),
                    ),
                )
            }
            const end: DOMHighResTimeStamp = performance.now()
            const duration: number = (end - start) / 1000
            process.stdout.write(` ✔ Migration Countries completed in ${duration.toFixed(2)} seconds\r\n`)
        } else {
            process.stdout.write(' -> Countries table already populated ✔ \r\n')
        }
    } catch (error) {
        const end: DOMHighResTimeStamp = performance.now()
        const duration: number = (end - start) / 1000
        process.stdout.write(` ✘ Migration Countries failed after ${duration.toFixed(2)} seconds\r\n`)
        console.error(error)
    }
}

async function performStatesMigration(prisma: PrismaClient, filePath: string): Promise<void> {
    const start: DOMHighResTimeStamp = performance.now()
    const batchSize: number = 500

    try {
        const csvFile: string = path.resolve(__dirname, filePath)

        const states: IStatesSeedData[] = await prisma.states.findMany()
        if (states.length === 0) {
            const seedData: IStatesSeedData[] = await readCSV(csvFile)

            for (let i: number = 0; i < seedData.length; i += batchSize) {
                const batchNumber: number = Math.floor(i / batchSize) + 1
                console.log(
                    `-> States: Start processing batch number ${batchNumber} (processing records ${i + 1} to ${seedData.length})`,
                )
                const batch: IStatesSeedData[] = seedData.slice(i, i + batchSize)
                await prisma.$transaction(
                    batch.map((state: IStatesSeedData) =>
                        prisma.states.create({
                            data: {
                                uuid: state.uuid,
                                type: state.type,
                                name: state.name,
                                countryId: state.countryId,
                                countryCode: state.countryCode,
                                countryName: state.countryName,
                                stateCode: state.stateCode,
                                latitude: Number(state.latitude),
                                longitude: Number(state.longitude),
                            },
                        }),
                    ),
                )
            }
            const end: DOMHighResTimeStamp = performance.now()
            const duration: number = (end - start) / 1000
            process.stdout.write(` ✔ Migration States completed in ${duration.toFixed(2)} seconds\r\n`)
        } else {
            process.stdout.write(' -> States table already populated ✔ \r\n')
        }
    } catch (error) {
        const end: DOMHighResTimeStamp = performance.now()
        const duration: number = (end - start) / 1000
        process.stdout.write(` ✘ Migration States failed after ${duration.toFixed(2)} seconds\r\n`)
        console.error(error)
    }
}

async function performCitiesMigration(prisma: PrismaClient, filePath: string): Promise<void> {
    const start: DOMHighResTimeStamp = performance.now()
    const batchSize: number = 500

    try {
        const csvFile: string = path.resolve(__dirname, filePath)

        const cities: ICitiesSeedData[] = await prisma.city.findMany()

        if (cities.length === 0) {
            const seedData: ICitiesSeedData[] = await readCSV(csvFile)

            for (let i: number = 0; i < seedData.length; i += batchSize) {
                const batchNumber: number = Math.floor(i / batchSize) + 1
                console.log(
                    `-> City: Start processing batch number ${batchNumber} (processing records ${i + 1} to ${seedData.length})`,
                )
                const batch: ICitiesSeedData[] = seedData.slice(i, i + batchSize)
                await prisma.$transaction(
                    batch.map((city: ICitiesSeedData) =>
                        prisma.city.create({
                            data: {
                                uuid: city.uuid,
                                name: city.name,
                                stateId: city.stateId,
                                stateCode: city.stateCode,
                                stateName: city.stateName,
                                countryId: city.countryId,
                                countryCode: city.countryCode,
                                countryName: city.countryCode,
                                latitude: Number(city.latitude),
                                longitude: Number(city.longitude),
                                wikiDataId: city.wikiDataId,
                            },
                        }),
                    ),
                )
            }
            const end: DOMHighResTimeStamp = performance.now()
            const duration: number = (end - start) / 1000
            process.stdout.write(` ✔ Migration City completed in ${duration.toFixed(2)} seconds\r\n`)
        } else {
            process.stdout.write(' -> City table already populated ✔ \r\n')
        }
    } catch (error) {
        const end: DOMHighResTimeStamp = performance.now()
        const duration: number = (end - start) / 1000
        process.stdout.write(` ✘ Migration City failed after ${duration.toFixed(2)} seconds\r\n`)
        console.error(error)
    }
}

async function performFacilityMigration(prisma: PrismaClient, seedData: IFacilitySeedData[]): Promise<void> {
    const start: DOMHighResTimeStamp = performance.now()

    try {
        const facility: IFacilitySeedData[] = await prisma.facility.findMany()

        if (facility.length === 0) {
            await prisma.$transaction(
                seedData.map((fac: IFacilitySeedData) =>
                    prisma.facility.create({
                        data: fac,
                    }),
                ),
            )
            const end: DOMHighResTimeStamp = performance.now()
            const duration: number = (end - start) / 1000
            process.stdout.write(` ✔ Migration Facility completed in ${duration.toFixed(2)} seconds\r\n`)
        } else {
            process.stdout.write(' -> Facility table already populated ✔ \r\n')
        }
    } catch (error) {
        const end: DOMHighResTimeStamp = performance.now()
        const duration: number = (end - start) / 1000 // convert milliseconds to seconds
        process.stdout.write(` ✘ Migration Facility failed after ${duration.toFixed(2)} seconds\r\n`)
        console.error(error)
    }
}
async function performCategoryMigration(prisma: PrismaClient, seedData: ICategorySeedData[]): Promise<void> {
    const start: DOMHighResTimeStamp = performance.now()

    try {
        const category: ICategorySeedData[] = await prisma.category.findMany()

        if (category.length === 0) {
            await prisma.$transaction(
                seedData.map((cat: ICategorySeedData) =>
                    prisma.category.create({
                        data: cat,
                    }),
                ),
            )
            const end: DOMHighResTimeStamp = performance.now()
            const duration: number = (end - start) / 1000
            process.stdout.write(` ✔ Migration Category completed in ${duration.toFixed(2)} seconds\r\n`)
        } else {
            process.stdout.write(' -> Category table already populated ✔ \r\n')
        }
    } catch (error) {
        const end: DOMHighResTimeStamp = performance.now()
        const duration: number = (end - start) / 1000 // convert milliseconds to seconds
        process.stdout.write(` ✘ Migration Category failed after ${duration.toFixed(2)} seconds\r\n`)
        console.error(error)
    }
}

async function runSeeders(): Promise<null> {
    console.log('Starting database seeding...')

    await performUserMigration(prisma, seedUsers)
    await performCountriesMigration(prisma, './countries/CountriesRo.csv')
    await performStatesMigration(prisma, './states/StatesRo.csv')
    await performCitiesMigration(prisma, './cities/CitiesRo.csv')
    await performCategoryMigration(prisma, seedCategories)
    await performFacilityMigration(prisma, seedFacilities)

    return null
}

runSeeders()
    .catch((e: any) => {
        console.error(`There was an error while seeding: ${e}`)
        process.exit(1)
    })
    .finally(async () => {
        console.info('✔ Successfully seeded database. Closing connection.')
        await prisma.$disconnect()
    })
