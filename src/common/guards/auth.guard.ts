import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { UtilService } from "../services/util.service";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private utilService: UtilService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Obtener el request de la peticion 
        const request = context.switchToHttp().getRequest<Request>();
        
        // usar el extractTokenFromHeader para obtener el token de NODE (de los headers)
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            // si el token no existe, lanzar un error 401
            throw new UnauthorizedException('Token no proporcionado o inválido');
        }

        try {
            // si existe el token, verificar el tiempo de expiracion obteniendo el payload desde UtilService
            const payload = await this.utilService.getPayload(token);
            
            // si el token es valido, permitir el acceso a la ruta y agregar el user (payload) al request
            // @ts-ignore
            request.user = payload;
            
            // y al final devolver resultado 
            return true;
        } catch (error) {
            // si el token no existe o esta expirado, lanzar un error 401
            throw new UnauthorizedException('Token inválido o expirado');
        }
    }

    // usar el extractTokenFromHeader para obtener el token de NODE
    private extractTokenFromHeader(request: Request): string | undefined {
        const authHeader = request.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            return authHeader.substring(7);
        }
        return undefined;
    }
}