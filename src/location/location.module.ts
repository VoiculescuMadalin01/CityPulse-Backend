import { Module } from '@nestjs/common'
import { LocationService } from './location.service'
import { LocationController } from './location.controller'
import { SupabaseService } from '@/common/supabase/supabase.service'
import { PrismaModule } from '@/common/prisma/prisma.module'
import { MulterModule } from '@nestjs/platform-express'

@Module({
    imports: [PrismaModule, MulterModule.register({ dest: './upload' })],
    controllers: [LocationController],
    providers: [LocationService, SupabaseService],
    exports: [LocationService],
})
export class LocationModule {}
