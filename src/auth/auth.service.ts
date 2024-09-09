import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { PrismaService } from '@/common/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { IAccessTokenPayload } from './interfaces/singInPayload'

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    public async register(createAuthDto: CreateAuthDto): Promise<{}> {
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: createAuthDto.email,
            },
        })

        if (existingUser) {
            throw new BadRequestException('Email is already registered')
        }

        if (createAuthDto.password !== createAuthDto.confirmPassword)
            throw new BadRequestException(`Passwords do not match`)

        const password = await bcrypt.hash(createAuthDto.password, 10)

        try {
            await this.prisma.user.create({
                data: {
                    email: createAuthDto.email,
                    password: password,
                    firstName: createAuthDto.firstName,
                    lastName: createAuthDto.lastName,
                    phone: null,
                },
            })
            return { message: 'User created successfully' }
        } catch (error) {
            throw new BadRequestException(`User cannot be created`)
        }
    }

    public async signIn(email: string, pass: string): Promise<IAccessTokenPayload> {
        const user: any | null = await this.prisma.user.findFirst({
            where: {
                email: email,
            },
        })

        if (!user) {
            throw new UnauthorizedException('Specified email does not exists.')
        }

        const isPasswordValid: boolean = await bcrypt.compare(pass, user.password)

        if (!isPasswordValid) {
            throw new UnauthorizedException('Specified passowrd is incorrect.')
        }

        await this.prisma.user.update({
            where: {
                email: email,
            },
            data: {
                lastSignInAt: new Date(),
            },
        })

        const payload: {
            uuid: string
            email: string
        } = { uuid: user.uuid, email: user.email }

        return {
            accessToken: await this.jwtService.signAsync(payload),
            uuid: user.uuid,
        }
    }
}
