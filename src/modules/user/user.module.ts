import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { mysqlProvider } from 'src/common/providers/mysql.provider';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService,mysqlProvider[0], PrismaService],
  exports: [...mysqlProvider, UserService],
})
export class UserModule {}
