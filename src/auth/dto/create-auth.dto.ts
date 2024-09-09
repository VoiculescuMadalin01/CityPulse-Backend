import { ApiProperty } from '@nestjs/swagger'

export class CreateAuthDto {
    @ApiProperty()
    public email: string
    @ApiProperty()
    public firstName: string
    @ApiProperty()
    public lastName: string
    @ApiProperty()
    public password: string
    @ApiProperty()
    public confirmPassword: string

    constructor(email: string, firstName: string, lastName: string, password: string, confirmPassword: string) {
        this.email = email
        this.firstName = firstName
        this.lastName = lastName
        this.password = password
        this.confirmPassword = confirmPassword
    }
}
