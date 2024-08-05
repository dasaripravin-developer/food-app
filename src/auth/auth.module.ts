import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthControler } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_KEY } from './secret.constant';

@Module({
  providers: [AuthService],
  controllers: [AuthControler],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: SECRET_KEY,
      signOptions: { expiresIn: '300s' },
    }),
  ],
})
export class AuthModule {}
