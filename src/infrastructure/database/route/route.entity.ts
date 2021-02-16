import { WhoColumnEntity } from "src/common/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Menu } from "../menu/menu.entity";
import { RoutePermission } from "../route-permission/route-permission.entity";

@Entity()
export class Route extends WhoColumnEntity {

  @Column()
  path!: string;

  @Column()
  description!: string;

  @OneToMany(() => RoutePermission, routePermission => routePermission.permission)
  routePermissions!:RoutePermission[]

  @OneToMany(() => Menu, menu => menu.route)
  menus!:Menu[]
}