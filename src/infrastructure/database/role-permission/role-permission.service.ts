import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseService } from "../../../common/base.service";
import { TenantService } from "../tenant/tenant-service.decorator";
import { IRolePermissionService } from "./i.role-permission.service";
import { RolePermission } from "./role-permission.entity";

@Injectable()
@TenantService()
export class PermissionService extends BaseService<Repository<RolePermission>, RolePermission> implements IRolePermissionService {
    constructor(
        @InjectRepository(RolePermission) protected readonly repository: Repository<RolePermission>
    ) {
        super(repository);
    }
}