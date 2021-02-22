import { BadRequestException, MiddlewareConsumer, Module, Scope } from '@nestjs/common';
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
import { Tenant } from './tenant/tenant.entity';
import { REQUEST } from '@nestjs/core';
import { Connection, createConnection, getConnection } from 'typeorm';


export const TENANT_CONNECTION = 'TENANT_CONNECTION';
@Module({
    imports: [
        CommonModule,
        TypeOrmModule.forFeature([Tenant]),
    ],
    providers: [
        {
            provide: TENANT_CONNECTION,
            inject: [
              REQUEST,
              Connection,
            ],
            scope: Scope.REQUEST,
            useFactory: async (request, connection) => {
              const tenant: Tenant = await connection.getRepository(Tenant).findOne(({ where: { host: request.headers.host } }));
              return getConnection(tenant.name);
            }
          },
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
        TENANT_CONNECTION,
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
        },
    ]
})
export class DatabaseModule { 
    constructor(private readonly connection: Connection) { }

  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(async (req: any, res: any, next: any) => {

        const tenant = await this.connection.getRepository(Tenant).findOne(({ where: { host: req.headers.host } }));

        if (!tenant) {
          throw new BadRequestException(
            'Database Connection Error',
            'There is a Error with the Database!',
          );
        }

        try {
          getConnection(tenant.name);
          next();
        } catch (e) {

          const createdConnection: Connection = await createConnection({
            name: tenant.name,
            type: "mysql",
            host: "localhost",
            port: 3307,
            username: 'root',
            password: 'computer',
            database: tenant.name,
            entities: [
              User,
              Role,
              UserRole,
              Permission,
              RolePermission,
              Route,
              RoutePermission,
              Menu,
              RefreshToken,
              Application
            ],
            synchronize: true,
          })

          if (createdConnection) {
            next();
          } else {
            throw new BadRequestException(
              'Database Connection Error',
              'There is a Error with the Database!',
            );
          }
        }
      }).forRoutes('*');
  }
}
