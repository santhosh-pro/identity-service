import { ApiProperty } from "@nestjs/swagger";

export class RefreshTokenRequest {
    @ApiProperty()
    accessToken!:string;
    @ApiProperty()
    refreshToken!:string;
}