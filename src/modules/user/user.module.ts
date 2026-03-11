import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { mysqlProvider } from 'src/common/providers/mysql.provider';
import { PrismaService } from 'src/common/services/prisma.service';
import { UtilService } from 'src/common/services/util.service';

@Module({
  controllers: [UserController],
  providers: [UserService,mysqlProvider[0], PrismaService, UtilService],
  exports: [...mysqlProvider, UserService],
})
export class UserModule {}
