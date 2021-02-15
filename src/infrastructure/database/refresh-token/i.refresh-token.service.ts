import { IBaseService } from "src/common/i.base.service";
import { RefreshTokenEntity } from "./refresh-token.entity";

export interface IRefreshTokenService extends IBaseService<RefreshTokenEntity>{
    validateRefreshToken(oldAccessToken: string, oldRefreshToken: string): Promise<RefreshTokenEntity>;
    generateRefreshToken(accessToken: string, username: string): Promise<string>;
}