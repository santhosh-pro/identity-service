import { WhoColumnEntity } from "src/common/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { RouteEntity } from "../route/route.entity";

@Entity({ name: 'menu' })
export class MenuEntity extends WhoColumnEntity {

  @Column()
  name!: string;

  @Column({nullable:true})
  parentMenuId!: string;

  @Column({nullable:true})
  routeId!: string;

  @ManyToOne(() => RouteEntity, route => route.menus)
  route!:RouteEntity;


}