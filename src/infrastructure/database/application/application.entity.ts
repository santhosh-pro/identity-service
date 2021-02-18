import { AuditColumn } from "src/common/audit-column.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Route } from "../route/route.entity";

@Entity()
export class Application extends AuditColumn {

  @Column()
  name!: string;

  @OneToMany(() => Route, route => route.application)
  routes!:Route[];
}