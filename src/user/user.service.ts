import { BadRequestException, Injectable } from '@nestjs/common'
import { AuthenticatedRequest, CreateUserDto, UpdateUserDto, UserDto } from './interfaces/user.interface'
import { PrismaService } from '@/common/prisma/prisma.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    public async getCurrent(getUser: AuthenticatedRequest): Promise<UserDto | null> {
        const { email, uuid } = getUser.user
        const user: UserDto | null = await this.prisma.user.findFirst({
            where: {
                email: email,
                uuid: uuid,
            },
        })

        return user
    }

    public async getAll(): Promise<UserDto[]> {
        const user: UserDto[] = await this.prisma.user.findMany()
        return user
    }

    public async getById(uuid: string): Promise<UserDto | null> {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    uuid: uuid,
                },
            })
            return user
        } catch (error) {
            throw new BadRequestException(`User cannot be deleted`)
        }
    }

    public async create(createUser: CreateUserDto): Promise<{}> {
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: createUser.email,
            },
        })

        if (existingUser) {
            throw new BadRequestException('Email is already registered')
        }

        const password = await bcrypt.hash(createUser.password, 10)
        try {
            await this.prisma.user.create({
                data: {
                    email: createUser.email,
                    password: password,
                    firstName: createUser.firstName,
                    lastName: createUser.lastName,
                    role: createUser.role,
                    phone: null,
                },
            })
            return { message: 'User created successfully' }
        } catch (error) {
            throw new BadRequestException(`User cannot be created`)
        }
    }

    public async update(uuid: string, updateUser: UpdateUserDto): Promise<{}> {
        const currentUser = await this.prisma.user.findUnique({
            where: {
                uuid: uuid,
            },
        })
        const existingUserEmail = await this.prisma.user.findUnique({
            where: {
                email: updateUser.email,
            },
        })

        if (currentUser?.email !== existingUserEmail?.email) {
            throw new BadRequestException('Email is already registered')
        }

        try {
            const newData = {
                ...updateUser,
                rawAppMetaData: {},
                rawUserMetaData: {},
            }
            await this.prisma.user.update({
                where: {
                    uuid: uuid,
                },
                data: newData,
            })
            return { message: 'User updated successfully' }
        } catch (error) {
            throw new BadRequestException(`User cannot be created`)
        }
    }

    public async delete(deleteUserDto: string[]): Promise<{}> {
        if (deleteUserDto.includes('1')) {
            throw new BadRequestException(`Super_Admin cannot be deleted`)
        }
        try {
            await this.prisma.user.deleteMany({
                where: {
                    uuid: {
                        in: deleteUserDto,
                    },
                },
            })
            return { message: 'Users  successfully deleted' }
        } catch (error) {
            throw new BadRequestException(`User cannot be deleted`)
        }
    }
}
