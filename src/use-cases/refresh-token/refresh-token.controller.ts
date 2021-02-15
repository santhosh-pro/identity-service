import { Body, Controller, Inject, InternalServerErrorException, Post } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiTags } from "@nestjs/swagger";
import { IRefreshTokenService } from "src/infrastructure/database/refresh-token/i.refresh-token.service";
import { RefreshTokenRequest } from "./refresh-token-request";
import * as bcrypt from 'bcrypt';

@ApiTags('users')
@Controller('users')
export class RefreshTokenController {
    constructor(
        @Inject('IRefreshTokenService') private readonly refreshTokenService: IRefreshTokenService,
        private readonly jwtService: JwtService
    ) {
    }

    @Post('refresh')
    async create(@Body() body: RefreshTokenRequest): Promise<any> {
        const refreshToken=await this.refreshTokenService.validateRefreshToken(body.accessToken, body.refreshToken);
            const payload = { username: refreshToken.username };

            const newAccesToken = await this.jwtService.sign(payload)
            const salt = await bcrypt.genSalt(10)

            refreshToken.hash = await bcrypt.hash(newAccesToken.split('.')[2] + salt, salt)

            try {
                await this.refreshTokenService.create(refreshToken);
                return { accessToken: newAccesToken, refreshToken: salt };
            } catch (e) {
                throw new InternalServerErrorException();
            }
        }

        @Post('test') 
        test():string {
            return 'works';
        }
}