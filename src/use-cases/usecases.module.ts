import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { SignInController } from './sign-in/sign-in.controller';
import { SignUpMapper } from './sign-up/sign-up-mapper';
import { SignUpController } from './sign-up/sign-up.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants, JwtStrategy } from 'src/use-cases/jwt.strategy';
import { RefreshTokenController } from './refresh-token/refresh-token.controller';
import { SignOutController } from './sign-out/sign-out.controller';
@Module({
    imports: [
        CommonModule,
        DatabaseModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [
        SignInController,
        SignUpController,
        RefreshTokenController,
        SignOutController
    ],
    providers: [
        JwtStrategy,
        SignUpMapper
    ],
})
export class UsecasesModule { }
