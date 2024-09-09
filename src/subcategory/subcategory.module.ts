import { Module } from '@nestjs/common'
import { SubcategoryService } from './subcategory.service'
import { SubcategoryController } from './subcategory.controller'
import { PrismaModule } from '@/common/prisma/prisma.module'

@Module({
    imports: [PrismaModule],
    controllers: [SubcategoryController],
    providers: [SubcategoryService],
    exports: [SubcategoryService],
})
export class SubcategoryModule {}
