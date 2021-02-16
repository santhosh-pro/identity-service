import { WhoColumnEntity } from "src/common/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Permission } from "../permission/permission.entity";
import { Route } from "../route/route.entity";

@Entity()
export class RoutePermission extends WhoColumnEntity {

  @Column()
  routeId!: string;

  @Column()
  permissionId!: string;

  @ManyToOne(() => Route, route => route.routePermissions)
  route!:Route
  
  @ManyToOne(() => Permission, route => route.routePermissions)
  permission!:Permission
}