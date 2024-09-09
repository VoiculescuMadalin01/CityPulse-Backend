import { PrismaService } from '@/common/prisma/prisma.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { CategoryDto } from './interface/category.interface'

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}

    public async create(createCategoryDto: CategoryDto): Promise<{}> {
        const existingCategory = await this.prisma.category.findUnique({
            where: {
                name: createCategoryDto.name,
            },
        })
        if (existingCategory) {
            throw new BadRequestException('Category is already registered')
        }
        try {
            await this.prisma.category.create({
                data: {
                    name: createCategoryDto.name,
                    description: createCategoryDto.description,
                    isEnable: createCategoryDto.isEnable,
                },
            })
            return { message: 'Category created successfully' }
        } catch (error) {
            throw new BadRequestException('Category cannot be created')
        }
    }
    public async getById(uuid: string): Promise<CategoryDto | null> {
        try {
            const category = await this.prisma.category.findFirst({
                where: {
                    uuid: uuid,
                },
            })
            return category
        } catch (error) {
            throw new BadRequestException(`Category cannot be found`)
        }
    }

    public async update(id: string, createCategoryDto: CategoryDto): Promise<{}> {
        try {
            await this.prisma.category.update({
                where: {
                    uuid: id,
                },
                data: {
                    name: createCategoryDto.name,
                    description: createCategoryDto.description,
                    isEnable: createCategoryDto.isEnable,
                },
            })
            return { message: 'Category updated successfully' }
        } catch (error) {
            throw new BadRequestException('Category cannot be updated')
        }
    }

    public async delete(deleteCategoryDto: string[]): Promise<{}> {
        try {
            await this.prisma.category.deleteMany({
                where: {
                    uuid: {
                        in: deleteCategoryDto,
                    },
                },
            })
            return { message: 'Category deleted successfully' }
        } catch (error) {
            throw new BadRequestException('Category cannot be deleted')
        }
    }

    public async getAll(): Promise<CategoryDto[]> {
        const category: CategoryDto[] = await this.prisma.category.findMany()

        return category
    }
}
