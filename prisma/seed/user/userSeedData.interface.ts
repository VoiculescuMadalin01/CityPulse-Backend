import { Role } from '@prisma/client'

export interface IUserSeedData {
    uuid: string
    role: Role
    email: string
    firstName: string
    lastName: string
    password: string
    emailConfirmedAt?: Date | null
    lastSignInAt?: Date | null
    rawAppMetaData?: any
    rawUserMetaData?: any
    createdAt?: Date
    updatedAt?: Date
    phone?: string | null
    phoneConfirmedAt?: Date | null
    bannedUntil?: Date | null
    isSsoUser?: boolean
    deletedAt?: Date | null
}
