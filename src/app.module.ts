import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TaskModule } from './modules/task/task.module';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './common/filters/http-exception.filter';

@Module({
  imports: [AuthModule, TaskModule, UserModule, PrismaModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
