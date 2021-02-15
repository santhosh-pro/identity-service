import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { IUserService } from "./i.user.service";
import { nameof } from "src/common/utils/nameof";
import { UserRoleEntity } from "../user-role/user-role.entity";
import { RoleEntity } from "../role/role.entity";

@Injectable()
export class UserService extends BaseService<Repository<UserEntity>, UserEntity> implements IUserService {
  constructor(
    @InjectRepository(UserEntity) protected readonly repository: Repository<UserEntity>
  ) {
    super(repository);
  }

  async validateUser(username: string): Promise<boolean> {
    const user = await this.findOne({ username: username });
    if (!user) {
      return false;
    }
    return true;
  }

  async signIn(username: string, password: string): Promise<UserEntity> {

    const user = await this.createQueryBuilder('u')
      .innerJoinAndSelect(`u.${nameof<UserEntity>(x => x.userRoles)}`, 'ur')
      .innerJoinAndSelect(`ur.${nameof<UserRoleEntity>(x => x.role)}`, 'r')
      .innerJoinAndSelect(`r.${nameof<RoleEntity>(x => x.rolePermissions)}`, 'rp')
      .where(`u.${nameof<UserEntity>(x => x.username)}=:username`, { username: username })
      .getOne();

    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  async hasPermission(userId: string, routePath: string): Promise<boolean> {
    // const roleIds:string[]= this.getRoles(userId);
    // const permissionIds:string[]= this.getPermissions(roleIds);
    // const 
    const hasPermission = this.createQueryBuilder('u')
      .innerJoinAndSelect(`u.${nameof<UserEntity>(x => x.userRoles)}`, 'ur')
      .innerJoinAndSelect(`ur.${nameof<UserRoleEntity>(x => x.role)}`, 'r')
      .innerJoinAndSelect(`r.${nameof<RoleEntity>(x => x.rolePermissions)}`, 'rp')
    return false;
  }

}