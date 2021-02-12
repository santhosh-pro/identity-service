import { BaseEntity } from "../../../common/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { UserRoleEntity } from "../user-role/user-role.entity";
import { RolePermissionEntity } from "../role-permission/role-permission.entity";

@Entity({ name: 'role' })
export class RoleEntity extends BaseEntity {

  @Column()
  name!: string;

  @Column()
  description!: string;

  @OneToMany(() => UserRoleEntity, userRole => userRole.role)
  userRoles!:UserRoleEntity[]

  @OneToMany(() => RolePermissionEntity, rolePermission => rolePermission.role)
  rolePermissions!:RolePermissionEntity[]
}