import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import { Repository } from "typeorm";
import { IUserRoleService } from "./i.user-role.service";
import { UserRoleEntity } from "./user-role.entity";

@Injectable()
export class UserRoleService extends BaseService<Repository<UserRoleEntity>, UserRoleEntity> implements IUserRoleService {
  constructor(
    @InjectRepository(UserRoleEntity) protected readonly repository: Repository<UserRoleEntity>
  ) {
    super(repository);
  } 

}