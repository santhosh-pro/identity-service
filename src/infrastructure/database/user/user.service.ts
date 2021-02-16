import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { IUserService } from "./i.user.service";
import { nameof } from "src/common/utils/nameof";
import { UserRole } from "../user-role/user-role.entity";
import { Role } from "../role/role.entity";

@Injectable()
export class UserService extends BaseService<Repository<User>, User> implements IUserService {
  constructor(
    @InjectRepository(User) protected readonly repository: Repository<User>
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

  async signIn(username: string, password: string): Promise<User> {

    const user = await this.createQueryBuilder('u')
      .innerJoinAndSelect(`u.${nameof<User>(x => x.userRoles)}`, 'ur')
      .innerJoinAndSelect(`ur.${nameof<UserRole>(x => x.role)}`, 'r')
      .innerJoinAndSelect(`r.${nameof<Role>(x => x.rolePermissions)}`, 'rp')
      .where(`u.${nameof<User>(x => x.username)}=:username`, { username: username })
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
      .innerJoinAndSelect(`u.${nameof<User>(x => x.userRoles)}`, 'ur')
      .innerJoinAndSelect(`ur.${nameof<UserRole>(x => x.role)}`, 'r')
      .innerJoinAndSelect(`r.${nameof<Role>(x => x.rolePermissions)}`, 'rp')
    return false;
  }

}