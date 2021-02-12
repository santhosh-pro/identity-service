import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { UserEntity } from './user/user.entity';
import { UserService } from './user/user.service';
import { UnitOfWork } from './unit-of-work';

@Module({
    imports: [
        CommonModule,
        TypeOrmModule.forFeature([UserEntity])
    ],
    providers: [
        UnitOfWork,
        {
            provide:'IUserService',
            useClass:UserService
        },
    ],
    exports:[
        TypeOrmModule.forFeature([UserEntity]),
        UnitOfWork,
        {
            provide:'IUserService',
            useClass:UserService
        },
    ]
})
export class DatabaseModule { }
