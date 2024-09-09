import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { CategoryService } from './category.service'
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CategoryDto, CategoryUpdateDto } from './interface/category.interface'
import { AuthGuard } from '@/auth/auth.guard'

@UseGuards(AuthGuard)
@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
    @Get('/getAll')
    public getAllCategory(): Promise<CategoryDto[]> {
        return this.categoryService.getAll()
    }

    @Get('/getById/:id')
    public getById(@Param('id') uuid: string): Promise<CategoryDto | null> {
        return this.categoryService.getById(uuid)
    }

    @Post('/create')
    public create(@Body() createCategoryDto: CategoryDto): Promise<{}> {
        return this.categoryService.create(createCategoryDto)
    }

    @Patch('/edit/:id')
    public editCategory(@Param('id') uuid: string, @Body() updateCategoryDto: CategoryUpdateDto): Promise<{}> {
        return this.categoryService.update(uuid, updateCategoryDto)
    }

    @Delete('/delete')
    public deleteCategories(@Body() deleteCategoryDto: string[]): Promise<{}> {
        return this.categoryService.delete(deleteCategoryDto)
    }
}
