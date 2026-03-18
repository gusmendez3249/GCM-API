import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from "../user/user.module";
import { UtilService } from "src/common/services/util.service";

@Module({
    imports:[
        JwtModule.register({}), 
        UserModule,
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,
        UtilService,
        JwtService
    ]
})
export class AuthModule {}