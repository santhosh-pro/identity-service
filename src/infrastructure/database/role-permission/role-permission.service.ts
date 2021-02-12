import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseService } from "../../../common/base.service";
import { IRolePermissionService } from "./i.role-permission.service";
import { RolePermissionEntity } from "./role-permission.entity";

@Injectable()
export class PermissionService extends BaseService<Repository<RolePermissionEntity>, RolePermissionEntity> implements IRolePermissionService {
    constructor(
        @InjectRepository(RolePermissionEntity) protected readonly repository: Repository<RolePermissionEntity>
    ) {
        super(repository);
    }
}