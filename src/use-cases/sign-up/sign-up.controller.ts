import { Body, Inject, Post } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UnitOfWork } from "src/infrastructure/database/unit-of-work";
import { IUserService } from "src/infrastructure/database/user/i.user.service";
import { SignUpMapper } from "./sign-up-mapper";
import { SignUpRequest } from "./sign-up-request";

@ApiTags('users')
@Controller('users')
export class SignUpController {
    constructor(
        @Inject('IUserService') private readonly userService: IUserService,
        private readonly mapper: SignUpMapper,
        private readonly unitOfWork : UnitOfWork
    ) {
    }

    @Post('signUp')
    async create(@Body() body: SignUpRequest): Promise<void> {
        
        this.unitOfWork.withTransaction(async ()=>{
            const user = this.mapper.request(body);
            await this.userService.create(user);
        });


    }
}