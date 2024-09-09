import { BadRequestException, Controller, Get, Injectable, UseGuards } from '@nestjs/common'
import { PrismaService } from '@/common/prisma/prisma.service'
import { FacilityDto } from './entities/facility.entity'
import { UpdateFacilityDto } from './dto/update-facility.dto'

@Injectable()
export class FacilityService {
    constructor(private prisma: PrismaService) {}

    public async getAll(): Promise<FacilityDto[]> {
        return this.prisma.facility.findMany()
    }

    public async getById(uuid: string): Promise<FacilityDto | null> {
        try {
            const facility = await this.prisma.facility.findFirst({
                where: {
                    uuid: uuid,
                },
            })
            return facility
        } catch (error) {
            throw new BadRequestException(`Category cannot be found`)
        }
    }

    public async add(createFacilityDto: FacilityDto): Promise<{}> {
        try {
            await this.prisma.facility.create({
                data: {
                    name: createFacilityDto.name,
                    icon: createFacilityDto.icon,
                    isEnable: createFacilityDto.isEnable,
                },
            })
            return { message: 'Category created successfully' }
        } catch (error) {
            throw new BadRequestException('Category cannot be created')
        }
    }

    public async update(id: string, createFacilityDto: UpdateFacilityDto): Promise<{}> {
        try {
            await this.prisma.facility.update({
                where: {
                    uuid: id,
                },
                data: {
                    name: createFacilityDto.name,
                    icon: createFacilityDto.icon,
                    isEnable: createFacilityDto.isEnable,
                },
            })
            return { message: 'Facility updated successfully' }
        } catch (error) {
            throw new BadRequestException('Category cannot be updated')
        }
    }

    public async delete(deleteFacilityDto: string[]): Promise<{}> {
        try {
            await this.prisma.facility.deleteMany({
                where: {
                    uuid: {
                        in: deleteFacilityDto,
                    },
                },
            })
            return { message: 'Facility deleted successfully' }
        } catch (error) {
            throw new BadRequestException('Facility cannot be deleted')
        }
    }
}
