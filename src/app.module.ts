import { UsecasesModule } from './use-cases/usecases.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { CommonModule } from './common/common.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infrastructure/database/user/user.entity';
import { SnakeNamingStrategy } from './common/snake-naming.strategy';
import { Role } from './infrastructure/database/role/role.entity';
import { UserRole } from './infrastructure/database/user-role/user-role.entity';
import { Permission } from './infrastructure/database/permission/permission.entity';
import { RolePermission } from './infrastructure/database/role-permission/role-permission.entity';
import { Route } from './infrastructure/database/route/route.entity';
import { RoutePermission } from './infrastructure/database/route-permission/route-permission.entity';
import { Menu } from './infrastructure/database/menu/menu.entity';
import { RefreshToken } from './infrastructure/database/refresh-token/refresh-token.entity';
import { JwtAuthGuard } from './jwt-auth.guard';

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
				User,
				Role,
				UserRole,
				Permission,
				RolePermission,
				Route,
				RoutePermission,
				Menu,
				RefreshToken
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
