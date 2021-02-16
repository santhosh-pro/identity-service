import { WhoColumnEntity } from "src/common/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Route } from "../route/route.entity";

@Entity()
export class Menu extends WhoColumnEntity {

  @Column()
  name!: string;

  @ManyToOne(() => Menu, menu => menu.menus, { nullable: true })
  @JoinColumn()
  parentId!: string;

  @Column({nullable:true})
  routeId!: string;

  @OneToMany(() => Menu, menu => menu.parentId, { cascade: true, nullable: true, eager: true })
  menus!: Menu[];

  @ManyToOne(() => Route, route => route.menus)
  route!:Route;


}