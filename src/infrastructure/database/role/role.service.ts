import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import { Repository } from "typeorm";
import { IRoleService } from "./i.role.service";
import { Role } from "./role.entity";

@Injectable()
export class UserService extends BaseService<Repository<Role>, Role> implements IRoleService {
    constructor(
        @InjectRepository(Role) protected readonly repository: Repository<Role>
    ) {
        super(repository);
    }
}