import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants'
import { PrismaModule } from '@/common/prisma/prisma.module'
import { UserModule } from '@/user/user.module'
import { UserController } from '@/user/user.controller'
import { UserService } from '@/user/user.service'
import { CategoryController } from '@/category/category.controller'
import { CategoryService } from '@/category/category.service'

@Module({
    imports: [
        PrismaModule,
        UserModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '15d' },
        }),
    ],
    providers: [AuthService, UserService, CategoryService],
    controllers: [AuthController, UserController, CategoryController],
})
export class AuthModule {}
