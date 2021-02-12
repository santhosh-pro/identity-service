import { ApiProperty } from "@nestjs/swagger";

export class SignUpRequest {
    @ApiProperty()
    name!: string;

    @ApiProperty()
    username!: string;

    @ApiProperty()
    email!: string;

    @ApiProperty()
    password!: string;
}