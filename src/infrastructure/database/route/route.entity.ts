import { AuditColumn } from "src/common/audit-column.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Application } from "../application/application.entity";
import { Menu } from "../menu/menu.entity";
import { RoutePermission } from "../route-permission/route-permission.entity";

@Entity()
export class Route extends AuditColumn {

  @Column()
  path!: string;

  @Column()
  description!: string;

  @Column()
  applicationId!: string;

  @ManyToOne(() => Application, application => application.routes)
  application!:Application

  @OneToMany(() => RoutePermission, routePermission => routePermission.permission)
  routePermissions!:RoutePermission[]

  @OneToMany(() => Menu, menu => menu.route)
  menus!:Menu[]
}