import { IBaseService } from "src/common/i.base.service";
import { RefreshToken } from "./refresh-token.entity";

export interface IRefreshTokenService extends IBaseService<RefreshToken>{
    validateRefreshToken(oldAccessToken: string, oldRefreshToken: string): Promise<RefreshToken>;
    generateRefreshToken(accessToken: string, username: string): Promise<string>;
}