import { WhoColumnEntity } from "../../../common/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { RolePermission } from "../role-permission/role-permission.entity";
import { RoutePermission } from "../route-permission/route-permission.entity";

@Entity()
export class Permission extends WhoColumnEntity {

  @Column()
  name!: string;

  @Column()
  description!: string;

  @OneToMany(() => RolePermission, rolePermission => rolePermission.permission)
  rolePermissions!:RolePermission[]

  @OneToMany(() => RoutePermission, routePermission => routePermission.permission)
  routePermissions!:RoutePermission[]
  
}