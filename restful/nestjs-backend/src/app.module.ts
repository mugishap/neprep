import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import appConfig from './config/app.config';
import { MailModule } from './mail/mail.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { FileModule } from './modules/file/file.module';
import { HealthModule } from './modules/health/health.module';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.register({
      secret: appConfig().jwt.secret,
      global: true,
      signOptions: { expiresIn: appConfig().jwt.expiresIn },
    }),
    FileModule,
    PrismaModule,
    HealthModule,
    MailModule,
    UserModule,
    AuthModule,
    AdminModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
