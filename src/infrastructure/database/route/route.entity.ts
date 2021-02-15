import { WhoColumnEntity } from "src/common/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { MenuEntity } from "../menu/menu.entity";
import { RoutePermissionEntity } from "../route-permission/route-permission.entity";

@Entity({ name: 'route' })
export class RouteEntity extends WhoColumnEntity {

  @Column()
  path!: string;

  @Column()
  description!: string;

  @OneToMany(() => RoutePermissionEntity, routePermission => routePermission.permission)
  routePermissions!:RoutePermissionEntity[]

  @OneToMany(() => MenuEntity, menu => menu.route)
  menus!:MenuEntity[]
}