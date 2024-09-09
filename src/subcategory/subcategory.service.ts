import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '@/common/prisma/prisma.service'
import { SubcategoryDto } from './entities/subcategory.entity'

@Injectable()
export class SubcategoryService {
    constructor(private prisma: PrismaService) {}

    // create(SubcategoryDto: SubcategoryDto) {
    //     return 'This action adds a new subcategory'
    // }

    public async getAll() {
        return this.prisma.subCategory.findMany({
            include: {
                category: {
                    select: {
                        name: true,
                    },
                },
            },
        })
    }
    public async getById(uuid: string): Promise<SubcategoryDto | null> {
        try {
            const subcategory = this.prisma.subCategory.findFirst({
                where: {
                    uuid: uuid,
                },
            })
            return subcategory
        } catch (error) {
            throw new BadRequestException(`Subcategory cannot be found`)
        }
    }

    public async create(createSubcategoryDto: SubcategoryDto): Promise<{}> {
        try {
            await this.prisma.subCategory.create({
                data: {
                    name: createSubcategoryDto.name,
                    description: createSubcategoryDto.description,
                    isEnable: createSubcategoryDto.isEnable,
                    categoryUuid: createSubcategoryDto.categoryUuid,
                },
            })
            return { message: 'Subcategory created successfully' }
        } catch (error) {
            console.log(error)
            throw new BadRequestException('Subcategory cannot be created')
        }
    }
    public async update(id: string, updateSubcategoryDto: SubcategoryDto): Promise<{}> {
        try {
            await this.prisma.subCategory.update({
                where: {
                    uuid: id,
                },
                data: {
                    name: updateSubcategoryDto.name,
                    description: updateSubcategoryDto.description,
                    isEnable: updateSubcategoryDto.isEnable,
                    categoryUuid: updateSubcategoryDto.categoryUuid,
                },
            })
            return { message: 'Subcategory updated successfully' }
        } catch (error) {
            console.log(error)

            throw new BadRequestException('Subcategory cannot be updated')
        }
    }

    public async delete(deleteSubCategoryDto: string[]): Promise<{}> {
        try {
            await this.prisma.subCategory.deleteMany({
                where: {
                    uuid: {
                        in: deleteSubCategoryDto,
                    },
                },
            })
            return { message: 'Sub-Category deleted successfully' }
        } catch (error) {
            throw new BadRequestException('Sub-Category cannot be deleted')
        }
    }
}
