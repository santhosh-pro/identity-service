import { ApiProperty } from "@nestjs/swagger";

export class SignOutRequest {
    @ApiProperty()
    refreshToken!:string;

    @ApiProperty()
    accessToken!:string;
}