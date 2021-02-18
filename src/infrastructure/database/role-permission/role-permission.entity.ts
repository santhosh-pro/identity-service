import { AuditColumn } from "../../../common/audit-column.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Role } from "../role/role.entity";
import { Permission } from "../permission/permission.entity";

@Entity()
export class RolePermission extends AuditColumn {

  @Column()
  roleId!: string;

  @Column()
  permissionId!: string;

  @ManyToOne(() => Role, role => role.rolePermissions)
  role!:Role;

  @ManyToOne(() => Permission, permission => permission.rolePermissions)
  permission!:Permission
  
}