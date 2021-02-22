import { Inject, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import { Repository } from "typeorm";
import { IRefreshTokenService } from "./i.refresh-token.service";
import { RefreshToken } from "./refresh-token.entity";
import * as bcrypt from 'bcrypt';
import { TenantService } from "../tenant/tenant-service.decorator";
import { TENANT_CONNECTION } from "../tenant/tenant.module";

@Injectable()
@TenantService()
export class RefreshTokenService extends BaseService<Repository<RefreshToken>, RefreshToken> implements IRefreshTokenService {
    constructor(
        @Inject(TENANT_CONNECTION) @InjectRepository(RefreshToken) protected readonly repository: Repository<RefreshToken>
    ) {
        super(repository);
    }

    async generateRefreshToken(accessToken: string, username: string): Promise<string> {
        const salt = await bcrypt.genSalt(10)

        const refreshToken = new RefreshToken()
        refreshToken.username = username
        refreshToken.hash = await bcrypt.hash(accessToken.split('.')[2] + salt, salt)

        try {
            await this.create(refreshToken);
            return salt;
        } catch (e) {
            throw new InternalServerErrorException();
        }

    }


    async validateRefreshToken(oldAccessToken: string, oldRefreshToken: string): Promise<RefreshToken> {
        
        const refreshTokenHash = await bcrypt.hash(oldAccessToken.split('.')[2] + oldRefreshToken, oldRefreshToken)
        const refreshToken = await this.findOne({ hash: refreshTokenHash })

        if (!refreshToken) {
            throw new UnauthorizedException(`Invalid tokens`);
        }

        return refreshToken;
    }
}