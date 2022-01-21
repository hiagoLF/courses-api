import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      privateKey: '08f97f637de4859c658268dffa6d563480379c82',
      signOptions: { expiresIn: '24h' }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
