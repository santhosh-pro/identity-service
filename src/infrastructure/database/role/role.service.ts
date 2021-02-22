import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import { Repository } from "typeorm";
import { TenantService } from "../tenant/tenant-service.decorator";
import { TENANT_CONNECTION } from "../tenant/tenant.module";
import { IRoleService } from "./i.role.service";
import { Role } from "./role.entity";

@Injectable()
@TenantService()
export class UserService extends BaseService<Repository<Role>, Role> implements IRoleService {
    constructor(
        @Inject(TENANT_CONNECTION) @InjectRepository(Role) protected readonly repository: Repository<Role>
    ) {
        super(repository);
    }
}