import { AuditColumn } from "src/common/audit-column.entity";
import {Column, Entity, ManyToOne } from "typeorm";
import { Role } from "../role/role.entity";
import { User } from "../user/user.entity";

@Entity()
export class UserRole extends AuditColumn {

  @Column()
  userId!: string;

  @Column()
  roleId!: string;

  @ManyToOne(() => User, user => user.userRoles)
  user!:User;

  @ManyToOne(() => Role, role => role.userRoles)
  role!:Role
}