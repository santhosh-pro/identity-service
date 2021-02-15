import { UsecasesModule } from './use-cases/usecases.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { CommonModule } from './common/common.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/database/user/user.entity';
import { SnakeNamingStrategy } from './common/snake-naming.strategy';
import { RoleEntity } from './infrastructure/database/role/role.entity';
import { UserRoleEntity } from './infrastructure/database/user-role/user-role.entity';
import { PermissionEntity } from './infrastructure/database/permission/permission.entity';
import { RolePermissionEntity } from './infrastructure/database/role-permission/role-permission.entity';
import { RouteEntity } from './infrastructure/database/route/route.entity';
import { RoutePermissionEntity } from './infrastructure/database/route-permission/route-permission.entity';
import { MenuEntity } from './infrastructure/database/menu/menu.entity';

@Module({
	imports: [
		CommonModule,
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: 'computer',
			database: 'identity',
			entities: [
				UserEntity,
				RoleEntity,
				UserRoleEntity,
				PermissionEntity,
				RolePermissionEntity,
				RouteEntity,
				RoutePermissionEntity,
				MenuEntity
			],
			synchronize: true,
			logging: ["query", "error"],
			namingStrategy: new SnakeNamingStrategy(),
		}),
		UsecasesModule,
		DatabaseModule,
	],
	providers: [],
})
export class AppModule { }
