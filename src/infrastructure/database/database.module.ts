import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { UserEntity } from './user/user.entity';
import { UserService } from './user/user.service';
import { UnitOfWork } from './unit-of-work';
import { MenuEntity } from './menu/menu.entity';
import { PermissionEntity } from './permission/permission.entity';
import { RolePermissionEntity } from './role-permission/role-permission.entity';
import { RoleEntity } from './role/role.entity';
import { RoutePermissionEntity } from './route-permission/route-permission.entity';
import { RouteEntity } from './route/route.entity';
import { UserRoleEntity } from './user-role/user-role.entity';

@Module({
    imports: [
        CommonModule,
        TypeOrmModule.forFeature([
            UserEntity,
            RoleEntity,
            UserRoleEntity,
            PermissionEntity,
            RolePermissionEntity,
            RouteEntity,
            RoutePermissionEntity,
            MenuEntity
        ])
    ],
    providers: [
        UnitOfWork,
        {
            provide: 'IUserService',
            useClass: UserService
        },
    ],
    exports: [
        TypeOrmModule.forFeature([
            UserEntity,
            RoleEntity,
            UserRoleEntity,
            PermissionEntity,
            RolePermissionEntity,
            RouteEntity,
            RoutePermissionEntity,
            MenuEntity
        ]),
        UnitOfWork,
        {
            provide: 'IUserService',
            useClass: UserService
        },
    ]
})
export class DatabaseModule { }
