import { BaseEntity } from "../../../common/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { RolePermissionEntity } from "../role-permission/role-permission.entity";

@Entity({ name: 'permission' })
export class PermissionEntity extends BaseEntity {

  @Column()
  name!: string;

  @Column()
  description!: string;

  @OneToMany(() => RolePermissionEntity, rolePermission => rolePermission.permission)
  rolePermissions!:RolePermissionEntity[]
  
}