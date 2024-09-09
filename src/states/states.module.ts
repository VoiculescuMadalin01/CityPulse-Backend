import { Module } from '@nestjs/common'
import { PrismaModule } from '@/common/prisma/prisma.module'
import { StatesController } from './states.controller'
import { StatesService } from './states.service'

@Module({
    imports: [PrismaModule],
    controllers: [StatesController],
    providers: [StatesService],
    exports: [StatesService],
})
export class StatesModule {}
