import { WhoColumnEntity } from "../../../common/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { RolePermissionEntity } from "../role-permission/role-permission.entity";
import { RoutePermissionEntity } from "../route-permission/route-permission.entity";

@Entity({ name: 'permission' })
export class PermissionEntity extends WhoColumnEntity {

  @Column()
  name!: string;

  @Column()
  description!: string;

  @OneToMany(() => RolePermissionEntity, rolePermission => rolePermission.permission)
  rolePermissions!:RolePermissionEntity[]

  @OneToMany(() => RoutePermissionEntity, routePermission => routePermission.permission)
  routePermissions!:RoutePermissionEntity[]
  
}