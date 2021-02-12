import { BaseEntity } from "src/common/base.entity";
import {Column, Entity, ManyToOne } from "typeorm";
import { RoleEntity } from "../role/role.entity";
import { UserEntity } from "../user/user.entity";

@Entity({ name: 'user-role' })
export class UserRoleEntity extends BaseEntity {

  @Column()
  userId!: string;

  @Column()
  roleId!: string;

  @ManyToOne(() => UserEntity, user => user.userRoles)
  user!:UserEntity;

  @ManyToOne(() => RoleEntity, role => role.userRoles)
  role!:RoleEntity
}