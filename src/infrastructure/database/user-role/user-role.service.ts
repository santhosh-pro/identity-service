import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import { Repository } from "typeorm";
import { TenantService } from "../tenant/tenant-service.decorator";
import { IUserRoleService } from "./i.user-role.service";
import { UserRole } from "./user-role.entity";

@Injectable()
@TenantService()
export class UserRoleService extends BaseService<Repository<UserRole>, UserRole> implements IUserRoleService {
  constructor(
    @InjectRepository(UserRole) protected readonly repository: Repository<UserRole>
  ) {
    super(repository);
  } 

}