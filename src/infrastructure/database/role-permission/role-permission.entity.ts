import { WhoColumnEntity } from "../../../common/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Role } from "../role/role.entity";
import { Permission } from "../permission/permission.entity";

@Entity()
export class RolePermission extends WhoColumnEntity {

  @Column()
  roleId!: string;

  @Column()
  permissionId!: string;

  @ManyToOne(() => Role, role => role.rolePermissions)
  role!:Role;

  @ManyToOne(() => Permission, permission => permission.rolePermissions)
  permission!:Permission
  
}