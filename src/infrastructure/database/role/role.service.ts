import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import { Repository } from "typeorm";
import { IRoleService } from "./i.role.service";
import { RoleEntity } from "./role.entity";

@Injectable()
export class UserService extends BaseService<Repository<RoleEntity>, RoleEntity> implements IRoleService {
    constructor(
        @InjectRepository(RoleEntity) protected readonly repository: Repository<RoleEntity>
    ) {
        super(repository);
    }
}