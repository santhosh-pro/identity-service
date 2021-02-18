import { AuditColumn } from "src/common/audit-column.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Route } from "../route/route.entity";

@Entity()
export class Menu extends AuditColumn {

  @Column()
  name!: string;

  @Column({nullable:true})
  routeId!: string;

  @OneToMany(() => Menu, menu => menu.parent, { cascade: true, nullable: true, eager: true })
  @JoinColumn()
  menus!: Menu[];

  @ManyToOne(() => Menu, menu => menu.menus, { nullable: true })
  @JoinColumn()
  parent!: Menu;

  @ManyToOne(() => Route, route => route.menus)
  route!:Route;


}