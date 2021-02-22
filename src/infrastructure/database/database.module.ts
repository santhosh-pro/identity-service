import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { UserService } from './user/user.service';
import { UnitOfWork } from './unit-of-work';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { MenuService } from './menu/menu.service';
import { TenantModule } from './tenant/tenant.module';
@Module({
    imports: [
        CommonModule,
        TenantModule
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
export class DatabaseModule { }
