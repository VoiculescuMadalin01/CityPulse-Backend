import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateAuthDto } from './dto/create-auth.dto'
import { LoginAuthDto } from './dto/login-auth.dto'
import { IAccessTokenPayload } from './interfaces/singInPayload'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    @ApiOkResponse({
        description: 'All information about the specified company',
        status: 200,
    })
    public register(@Body() createAuthDto: CreateAuthDto): Promise<{}> {
        return this.authService.register(createAuthDto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('/login')
    public signIn(@Body() signInDto: LoginAuthDto): Promise<IAccessTokenPayload> {
        return this.authService.signIn(signInDto.email, signInDto.password)
    }
}
