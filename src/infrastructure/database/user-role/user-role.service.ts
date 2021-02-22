import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import { Repository } from "typeorm";
import { TenantService } from "../tenant/tenant-service.decorator";
import { TENANT_CONNECTION } from "../tenant/tenant.module";
import { IUserRoleService } from "./i.user-role.service";
import { UserRole } from "./user-role.entity";

@Injectable()
@TenantService()
export class UserRoleService extends BaseService<Repository<UserRole>, UserRole> implements IUserRoleService {
  constructor(
    @Inject(TENANT_CONNECTION) @InjectRepository(UserRole) protected readonly repository: Repository<UserRole>
  ) {
    super(repository);
  } 

}