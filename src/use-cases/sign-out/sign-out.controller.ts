import { Body, Controller, HttpException, HttpStatus, Inject, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IRefreshTokenService } from "src/infrastructure/database/refresh-token/i.refresh-token.service";
import { IUserService } from "src/infrastructure/database/user/i.user.service";
import { SignOutRequest } from "./sign-out-request";
import * as bcrypt from 'bcrypt';

@ApiTags('users')
@Controller('users')
export class SignOutController {
    constructor(
        @Inject('IUserService') private readonly userService: IUserService,
        @Inject('IRefreshTokenService') private readonly refreshTokenService: IRefreshTokenService,
    ) {
    }

    @Put('signOut')
    async create(@Body() body: SignOutRequest): Promise<any> {
        const refreshTokenHash = await bcrypt.hash(body.accessToken.split('.')[2] + body.refreshToken, body.refreshToken)
        const refreshToken = await this.refreshTokenService.findOne({ hash: refreshTokenHash });

        if (!refreshToken)
            throw new HttpException('Id not Found', HttpStatus.BAD_REQUEST);
        this.refreshTokenService.deleteById(refreshToken.id);

    }
}