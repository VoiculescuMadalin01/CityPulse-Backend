import { Controller, Get, Injectable, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger'
import { CountryDto } from './entities/country.entity'
import { PrismaService } from '@/common/prisma/prisma.service'

@Injectable()
export class CountryService {
    constructor(private prisma: PrismaService) {}

    public getAll(): Promise<CountryDto[]> {
        return this.prisma.country.findMany()
    }
}
