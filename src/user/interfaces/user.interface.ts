import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Prisma, Role } from '@prisma/client'
import { JsonValue } from '@prisma/client/runtime/library'
import { IsEmail, IsPhoneNumber, IsString, MinLength } from 'class-validator'

export class UserDto {
    @ApiProperty({ description: 'Unique identifier for the user' })
    uuid!: string

    @ApiProperty({ description: 'Role of the user' })
    role!: Role

    @ApiProperty({ description: 'Email address of the user' })
    email!: string

    @ApiProperty({ description: 'First name of the user' })
    firstName!: string

    @ApiProperty({ description: 'Last name of the user' })
    lastName!: string

    @ApiProperty({ description: 'Password of the user' })
    password!: string

    @ApiPropertyOptional({ type: Date, description: 'Date when the user confirmed their email' })
    emailConfirmedAt?: Date | null

    @ApiPropertyOptional({ type: Date, description: 'Date of the user’s last sign in' })
    lastSignInAt?: Date | null

    @ApiPropertyOptional({ type: 'object', description: 'Raw application metadata' })
    rawAppMetaData?: JsonValue

    @ApiPropertyOptional({ type: 'object', description: 'Raw user metadata' })
    rawUserMetaData?: JsonValue

    @ApiPropertyOptional({ description: 'Indicates if the user is a super admin' })
    isSuperAdmin?: boolean

    @ApiPropertyOptional({ type: Date, description: 'When the user was created' })
    createdAt?: Date

    @ApiPropertyOptional({ type: Date, description: 'When the user was last updated' })
    updatedAt?: Date

    @ApiPropertyOptional({ description: 'Phone number of the user' })
    phone?: string | null

    @ApiPropertyOptional({ type: Date, description: 'Date when the user confirmed their phone number' })
    phoneConfirmedAt?: Date | null

    @ApiPropertyOptional({ type: Date, description: 'Date until which the user is banned' })
    bannedUntil?: Date | null

    @ApiPropertyOptional({ description: 'Indicates if the user is an SSO user' })
    isSsoUser?: boolean

    @ApiPropertyOptional({ type: Date, description: 'Date when the user was deleted' })
    deletedAt?: Date | null
}

export class CreateUserDto {
    @ApiProperty({ example: 'John' })
    @IsString()
    firstName!: string

    @ApiProperty({ example: 'Doe' })
    @IsString()
    lastName!: string

    @ApiProperty({ example: 'john.doe@example.com' })
    @IsEmail()
    email!: string

    @ApiProperty({ example: 'admin' })
    @IsString() // Adjust validation based on your IUserRole structure
    role!: Role

    @ApiProperty({ example: 'strongPassword123' })
    @IsString()
    @MinLength(8)
    password!: string

    @ApiProperty({ example: '+1234567890' })
    @IsPhoneNumber()
    phone!: string | null

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        role: Role,
        password: string,
        phone: string | null = null,
    ) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.role = role
        this.password = password
        this.phone = phone
    }
}

export class UpdateUserDto {
    @ApiProperty({ description: 'Unique identifier for the user' })
    uuid!: string

    @ApiProperty({ description: 'Role of the user' })
    role!: Role

    @ApiProperty({ description: 'Email address of the user' })
    email!: string

    @ApiProperty({ description: 'First name of the user' })
    firstName!: string

    @ApiProperty({ description: 'Last name of the user' })
    lastName!: string

    @ApiProperty({ description: 'Password of the user' })
    password!: string

    @ApiPropertyOptional({ type: Date, description: 'Date when the user confirmed their email' })
    emailConfirmedAt?: Date | null

    @ApiPropertyOptional({ type: Date, description: 'Date of the user’s last sign in' })
    lastSignInAt?: Date | null

    @ApiProperty({ type: 'object', description: 'Raw application metadata' })
    rawAppMetaData?: Prisma.InputJsonValue

    @ApiProperty({ type: 'object', description: 'Raw user metadata' })
    rawUserMetaData?: Prisma.InputJsonValue

    @ApiPropertyOptional({ description: 'Indicates if the user is a super admin' })
    isSuperAdmin?: boolean

    @ApiPropertyOptional({ type: Date, description: 'When the user was created' })
    createdAt?: Date

    @ApiPropertyOptional({ type: Date, description: 'When the user was last updated' })
    updatedAt?: Date

    @ApiPropertyOptional({ description: 'Phone number of the user' })
    phone?: string | null

    @ApiPropertyOptional({ type: Date, description: 'Date when the user confirmed their phone number' })
    phoneConfirmedAt?: Date | null

    @ApiPropertyOptional({ type: Date, description: 'Date until which the user is banned' })
    bannedUntil?: Date | null

    @ApiPropertyOptional({ description: 'Indicates if the user is an SSO user' })
    isSsoUser?: boolean

    @ApiPropertyOptional({ type: Date, description: 'Date when the user was deleted' })
    deletedAt?: Date | null
}

export type AuthenticatedRequest = Request & {
    user: UserDto
}
