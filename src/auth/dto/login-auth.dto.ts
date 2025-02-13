import { ApiProperty } from '@nestjs/swagger'

export class LoginAuthDto {
    @ApiProperty()
    public email: string
    @ApiProperty()
    public password: string

    constructor(email: string, password: string) {
        this.email = email
        this.password = password
    }
}
