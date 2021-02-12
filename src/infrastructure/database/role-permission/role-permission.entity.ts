import { BaseEntity } from "../../../common/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { RoleEntity } from "../role/role.entity";
import { PermissionEntity } from "../permission/permission.entity";

@Entity({ name: 'role-permission' })
export class RolePermissionEntity extends BaseEntity {

  @Column()
  roleId!: string;

  @Column()
  permissionId!: string;

  @ManyToOne(() => RoleEntity, role => role.rolePermissions)
  role!:RoleEntity;

  @ManyToOne(() => PermissionEntity, permission => permission.rolePermissions)
  permission!:PermissionEntity
  
}