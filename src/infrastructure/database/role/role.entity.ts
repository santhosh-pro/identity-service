import { WhoColumnEntity } from "../../../common/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { UserRole } from "../user-role/user-role.entity";
import { RolePermission } from "../role-permission/role-permission.entity";

@Entity()
export class Role extends WhoColumnEntity {

  @Column()
  name!: string;

  @Column()
  description!: string;

  @OneToMany(() => UserRole, userRole => userRole.role)
  userRoles!:UserRole[]

  @OneToMany(() => RolePermission, rolePermission => rolePermission.role)
  rolePermissions!:RolePermission[]
}