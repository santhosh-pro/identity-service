import { WhoColumnEntity } from "src/common/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { PermissionEntity } from "../permission/permission.entity";
import { RouteEntity } from "../route/route.entity";

@Entity({ name: 'route_permission' })
export class RoutePermissionEntity extends WhoColumnEntity {

  @Column()
  routeId!: string;

  @Column()
  permissionId!: string;

  @ManyToOne(() => RouteEntity, route => route.routePermissions)
  route!:RouteEntity
  
  @ManyToOne(() => PermissionEntity, route => route.routePermissions)
  permission!:PermissionEntity
}