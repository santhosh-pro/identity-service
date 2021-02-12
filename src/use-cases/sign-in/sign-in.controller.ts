import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IUserService } from "src/infrastructure/database/user/i.user.service";
import { SignInRequest } from "./sign-in-request";
import { JwtService } from '@nestjs/jwt';

@ApiTags('users')
@Controller('users')
export class SignInController {
    constructor(
        @Inject('IUserService') private readonly userService: IUserService,
        private readonly jwtService: JwtService
    ) {
    }

    @Post('signIn')
    async create(@Body() body: SignInRequest): Promise<any> {

        const user = await this.userService.signIn(body.username, body.password);
        const payload = { username: user.username, id: user.id, name: user.name,permissions:user.userRoles[0].role.name };
        return {
            token: this.jwtService.sign(payload),
        };
    }
}