import { UsecasesModule } from './use-cases/usecases.module';
import { CommonModule } from './common/common.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from './common/snake-naming.strategy';
import { Tenant } from './infrastructure/database/tenant/tenant.entity';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
	imports: [
		CommonModule,
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: 'computer',
			database: 'tenant',
			entities: [
				Tenant
			],
			synchronize: true,
			logging: ["query", "error"],
			namingStrategy: new SnakeNamingStrategy(),
		}),
		DatabaseModule,
		UsecasesModule,
	],
	providers: [],
})
export class AppModule { }
