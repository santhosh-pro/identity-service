import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import { Repository } from "typeorm";
import { IUserRoleService } from "./i.user-role.service";
import { UserRole } from "./user-role.entity";

@Injectable()
export class UserRoleService extends BaseService<Repository<UserRole>, UserRole> implements IUserRoleService {
  constructor(
    @InjectRepository(UserRole) protected readonly repository: Repository<UserRole>
  ) {
    super(repository);
  } 

}