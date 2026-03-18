import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Headers,
  UnauthorizedException,
  UseGuards,
  Req
} from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { AuthDto } from './dto/login.user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authSvc: AuthService) {}

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
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Verifica las credenciales y genera un JWT y un RefreshToken',
  })
  public async login(@Body() userLogin: AuthDto) {
    //Verificar el usuario y contraseña
    //1. Obtener primer el user con el username
    //si no existe regresar un trow de aturizacion excepcion
    //obtener los datos del usuario solo quitando la password
    //2. Verificar la contraseña con el metodo de util.service con la password y el hash de user.password
    //en caso de que no coincida la contraseña regresar un autorización excepcion
    //si todo esta bien continuamos con lo siguiente

    //Generar token de acces

    //generar el token acceso con el util.service para 60 segs

    //Generar refresh token
    //generar el refresh token de 7 dias

    //Devolver la informacion
    //devolcer el acceso token y el refresh token

    return this.authSvc.login(userLogin);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Extrae el ID del usuario desde el token y busca la información completando el request',
  })
  public async getProfile(@Req() req: any) {
    // AuthGuard ya validó el token y colocó el payload dentro de req.user
    // Como getProfile del authService re-validaba todo desde el token original
    // y devolvía el usuario desde la bd, podemos hacer lo mismo:
    const id = req.user.id;
    return this.authSvc.getProfileFromId(id); // O pasamos el token original si no queremos crear uno nuevo, pero mejor creamos un método getProfileFromId en el service
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Renueva el token de acceso usando el RefreshToken',
  })
  public async refreshToken(@Body('refreshToken') refreshToken: string) {
    if (!refreshToken) throw new UnauthorizedException('RefreshToken no proporcionado');
    return this.authSvc.refreshToken(refreshToken);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Cierra sesión eliminando el RefreshToken de la DB',
  })
  public async logout(@Headers('authorization') authHeader: string) {
    if (!authHeader) throw new UnauthorizedException('Token no proporcionado');
    const token = authHeader.split(' ')[1];
    
    // Obtenemos el profile para sacar el ID y eliminar el refresh token.
    // Si el token expiró, no podrá hacer logout de manera normal, pero en muchos sistemas el logout en backend limpio se asume con token valido.
    const user = await this.authSvc.getProfile(token);
    return this.authSvc.logout(user.id);
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
//! git commit -a -m "fix: Uso de Guards y protección de las rutas"
