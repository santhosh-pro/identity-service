import { WhoColumnEntity } from "src/common/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Route } from "../route/route.entity";

@Entity()
export class Menu extends WhoColumnEntity {

  @Column()
  name!: string;

  @Column({nullable:true})
  parentMenuId!: string;

  @Column({nullable:true})
  routeId!: string;

  @ManyToOne(() => Route, route => route.menus)
  route!:Route;


}