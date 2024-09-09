import { Role } from '@prisma/client'
import { IUserSeedData } from './userSeedData.interface'

export const seedUsers: IUserSeedData[] = [
    {
        uuid: '1',
        email: '1@1.com',
        firstName: 'Admin',
        lastName: 'Denis',
        password: '$2a$10$2e786MzsLaCva4CoLraoU.x0xI0tY0Yeblyxd6IEuTLuvNW4Imn9y', // password
        phone: '+40751862506',
        emailConfirmedAt: new Date(), // Mock current date for email confirmation
        lastSignInAt: new Date(), // Mock current date for last sign-in
        rawAppMetaData: {
            appVersion: '1.0.0',
            appSettings: {
                theme: 'dark',
            },
        }, // Mock JSON data for application metadata
        rawUserMetaData: {
            preferences: {
                language: 'en',
                notifications: true,
            },
        }, // Mock JSON data for user metadata
        phoneConfirmedAt: new Date(), // Mock current date for phone confirmation
        bannedUntil: null, // Mock no ban
        isSsoUser: false, // Mock value for whether the user is an SSO user
        deletedAt: null, // Mock no deletion
        role: Role.SUPER_ADMIN,
    },
]
