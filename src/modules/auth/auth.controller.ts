import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login.user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authSvc: AuthService) { }

  // Agregar por medio del body username y password a login()
  // verificar el username en la base de datos, si existe devolver el objeto user
  // si el usuairo no existe devolver un unautorizedException 401? trown
  // en caso de que exista revisar la contraseña dentro del método checkpassword() en Utils
  // si es true -> contraseña correcta, si sucede esto se genera un token de acceso por 60 segundos
  // luego otro token "RefreshToken" que vencerá en 7 días el cual debe de guardarse en la base de datos
  // el payload es el [id, name, lastname, created_date] retornar el acces token y el refresh token en un solo object
  /**
   * 
   * {
   *  accesToken:"",
   *  refreshToken: ""
   * }
   */
  // seguir la documentación de Nest/Segurity/Authorization/JWT token
  // Dos metodos util.service uno para obtener el payload del token y otro para generar el token
    @Post("login")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Verifica las credenciales y genera un JWT y un RefreshToken" })
    public async login(@Body() userLogin: LoginUserDto) {
    return this.authSvc.login(userLogin);
    }


  @Get("me")
  @ApiOperation({ summary: "Extrae el ID del usuario desde el token y busca la información" })
  public getProfile() {

  }

  public refreshToken() {

  }

  public logout() {

  }
}

    //TODO: 
    //body: username y password
    //verificar el username en la base de datos, si el username existe devolver el objeto user
    /*
    si el usuario no existe con el username, devolver un AuthorizeExepción 401 (Throw Exception)
    si existe el usuario, revisar la contraseña con metodo checkPassword en nuestro servicio de Utilis el cual devuelve un booleanos 
    si es verdadero el usuario si existe y la contraseña es correcta
    si es valido todo, devolver un token de acceso por 60 segundos
    generar otro token llamado refresh token con vencimiento por 7 dias y ese token guardarlo en la base de datos
    
    payload
    id 
    name
    lastname 
    create_data

    retornar el acces token y refresh token 

    recibir de forma opcional el tiempo de expiración
    seguir los pasos de JWT Token
    En util service crear dos metodos uno para obtener el payload del token y otro para generar el token con el parametro de payload y tiempo de expiración

    */
    //! git commit -a -m "fix: Correcion del CRUD de usuarios y uso de bscrypt"
