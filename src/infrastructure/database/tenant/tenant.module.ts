import { BadRequestException, MiddlewareConsumer, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'src/common/snake-naming.strategy';
import { Connection, createConnection, getConnection } from 'typeorm';
import { Application } from '../application/application.entity';
import { Menu } from '../menu/menu.entity';
import { Permission } from '../permission/permission.entity';
import { RefreshToken } from '../refresh-token/refresh-token.entity';
import { RolePermission } from '../role-permission/role-permission.entity';
import { Role } from '../role/role.entity';
import { RoutePermission } from '../route-permission/route-permission.entity';
import { Route } from '../route/route.entity';
import { UserRole } from '../user-role/user-role.entity';
import { User } from '../user/user.entity';

import { Tenant } from './tenant.entity';

export const TENANT_CONNECTION = 'TENANT_CONNECTION';

@Module({
  imports: [
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
    }
  ],
  exports: [
    TENANT_CONNECTION
  ]
})
export class TenantModule {
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

        try {
          getConnection(tenant.name);
          next();
        } catch (e) {

          const createdConnection: Connection = await createConnection({
            name: tenant.name,
            type: "mysql",
            host: "localhost",
            port: 3306,
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
            logging: ["query", "error"],
            namingStrategy: new SnakeNamingStrategy(),
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