import { Controller, Get, UseGuards, Request, Body, Post, Delete, Param, Patch } from '@nestjs/common'
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserService } from './user.service'
import { AuthenticatedRequest, CreateUserDto, UpdateUserDto, UserDto } from './interfaces/user.interface'
import { AuthGuard } from '@/auth/auth.guard'

@UseGuards(AuthGuard)
@Controller('users')
@ApiTags('Users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/getCurrent')
    public getCurrentUser(@Request() req: AuthenticatedRequest): Promise<UserDto | null> {
        return this.userService.getCurrent(req)
    }

    @Get('/getAll')
    public getAllUsers(): Promise<UserDto[]> {
        return this.userService.getAll()
    }

    @Get('/getById/:id')
    public getById(@Param('id') uuid: string): Promise<UserDto | null> {
        return this.userService.getById(uuid)
    }

    @Post('/create')
    public addUser(@Body() createUserDto: CreateUserDto): Promise<{}> {
        return this.userService.create(createUserDto)
    }

    @Patch('/edit/:id')
    public editUser(@Param('id') uuid: string, @Body() updateUserDto: UpdateUserDto): Promise<{}> {
        return this.userService.update(uuid, updateUserDto)
    }

    @Delete('/delete')
    public deleteUsers(@Body() deleteUserDto: string[]): Promise<{}> {
        return this.userService.delete(deleteUserDto)
    }
}
