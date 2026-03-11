import { Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation } from "@nestjs/swagger";

@Controller("api/auth")
export class AuthController {
    
    constructor(private authSvc: AuthService){}

    @Post("login")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: 'Verifica tus credenciaes y genera un JWT'})
    public login(): string{
        return this.authSvc.login();
    }

    @Get("no")
    @ApiOperation({summary: 'Extrae el id del usuario'})
    public getProfile(){}

    public refreshToken(){}

    public logout(){}

    //! git commit -a -m "fix: Correcion del CRUD de usuarios y uso de bscrypt"
}
