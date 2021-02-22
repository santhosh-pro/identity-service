import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseService } from "../../../common/base.service";
import { TenantService } from "../tenant/tenant-service.decorator";
import { IPermissionService } from "./i.permission.service";
import { Permission } from "./permission.entity";

@Injectable()
@TenantService()
export class PermissionService extends BaseService<Repository<Permission>, Permission> implements IPermissionService {
    constructor(
        @InjectRepository(Permission) protected readonly repository: Repository<Permission>
    ) {
        super(repository);
    }
}