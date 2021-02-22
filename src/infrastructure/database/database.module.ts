import { BadRequestException, MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { User } from './user/user.entity';
import { UserService } from './user/user.service';
import { UnitOfWork } from './unit-of-work';
import { Menu } from './menu/menu.entity';
import { Permission } from './permission/permission.entity';
import { RolePermission } from './role-permission/role-permission.entity';
import { Role } from './role/role.entity';
import { RoutePermission } from './route-permission/route-permission.entity';
import { Route } from './route/route.entity';
import { UserRole } from './user-role/user-role.entity';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { RefreshToken } from './refresh-token/refresh-token.entity';
import { Application } from './application/application.entity';
import { MenuService } from './menu/menu.service';
import { Connection } from 'typeorm';
import { Tenant } from './tenant/tenant.entity';
import { TenantFilter } from './tenant-filter';

@Module({
    imports: [
        CommonModule,
        TypeOrmModule.forFeature([
            User,
            Role,
            UserRole,
            Permission,
            RolePermission,
            Route,
            RoutePermission,
            Menu,
            RefreshToken,
            Application,
            Tenant
        ])
    ],
    providers: [
        UnitOfWork,
        {
            provide: 'IUserService',
            useClass: UserService
        },
        {
            provide: 'IRefreshTokenService',
            useClass: RefreshTokenService
        },
        {
            provide: 'IMenuService',
            useClass: MenuService
        }

    ],
    exports: [
        TypeOrmModule.forFeature([
            User,
            Role,
            UserRole,
            Permission,
            RolePermission,
            Route,
            RoutePermission,
            Menu,
            RefreshToken,
            Application,
            Tenant
        ]),
        UnitOfWork,
        {
            provide: 'IUserService',
            useClass: UserService
        },
        {
            provide: 'IRefreshTokenService',
            useClass: RefreshTokenService
        },
        {
            provide: 'IMenuService',
            useClass: MenuService
        }
    ]
})
export class DatabaseModule {
    constructor(private readonly connection: Connection) { }

    configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(async (req, res, next) => {
                const tenant: Tenant = await this.connection.getRepository(Tenant).findOne(({ where: { host: req.headers.host } }));
                if (!tenant) {
                    throw new BadRequestException(
                        'Database Connection Error',
                        'There is a Error with the Database!',
                    );
                }

                TenantFilter.tenantId = tenant.id;
                next();

            }).forRoutes('*');
    }
}
