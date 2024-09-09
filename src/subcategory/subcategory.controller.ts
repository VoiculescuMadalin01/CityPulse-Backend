import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { SubcategoryService } from './subcategory.service'
import { ApiTags } from '@nestjs/swagger'
import { SubcategoryDto } from './entities/subcategory.entity'
import { AuthGuard } from '@/auth/auth.guard'

@UseGuards(AuthGuard)
@Controller('subcategory')
@ApiTags('Subcategory')
export class SubcategoryController {
    constructor(private readonly subCategoryService: SubcategoryService) {}

    @Get('/getAll')
    getAll() {
        return this.subCategoryService.getAll()
    }
    @Get('/getById/:id')
    getSubCategoryById(@Param('id') uuid: string): Promise<SubcategoryDto | null> {
        return this.subCategoryService.getById(uuid)
    }
    @Post('/create')
    public create(@Body() createCategoryDto: SubcategoryDto): Promise<{}> {
        return this.subCategoryService.create(createCategoryDto)
    }
    @Patch('/edit/:id')
    public edit(@Param('id') uuid: string, @Body() updateSubcategoryDto: SubcategoryDto): Promise<{}> {
        return this.subCategoryService.update(uuid, updateSubcategoryDto)
    }
    @Delete('/delete')
    public deleteCategories(@Body() deleteSubCategoryDto: string[]): Promise<{}> {
        return this.subCategoryService.delete(deleteSubCategoryDto)
    }
}
