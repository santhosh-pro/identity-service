import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IUserService } from "src/infrastructure/database/user/i.user.service";
import { SignInRequest } from "./sign-in-request";
import { JwtService } from '@nestjs/jwt';
import { IRefreshTokenService } from "src/infrastructure/database/refresh-token/i.refresh-token.service";

@ApiTags('users')
@Controller('users')
export class SignInController {
    constructor(
        @Inject('IUserService') private readonly userService: IUserService,
        @Inject('IRefreshTokenService') private readonly refreshTokenService: IRefreshTokenService,
        private readonly jwtService: JwtService
    ) {
    }

    @Post('signIn')
    async create(@Body() body: SignInRequest): Promise<any> {

        const user = await this.userService.signIn(body.username, body.password);
        
        const permissions:Array<string>=[];
        user.userRoles.forEach(r=>{
            r.role.rolePermissions.forEach(p=>{
                permissions.push(p.permissionId)
            })
        })
        
        const payload = { 
            username: user.username, 
            id: user.id, 
            name: user.name,
            roles:user.userRoles.map(x=>x.roleId), 
            permissions:permissions 
        };

        const accessToken:string=this.jwtService.sign(payload);
        const refreshToken = await this.refreshTokenService.generateRefreshToken(accessToken, user.username)
        return {
            accessToken, refreshToken
        };
    }
}