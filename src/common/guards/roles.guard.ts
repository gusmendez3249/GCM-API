import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<number[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) {
      return true;
    }
    
    const { user } = context.switchToHttp().getRequest();
    
    if (!user || !user.rol_id) {
       throw new ForbiddenException('No cuentas con el rol necesario para esta acción');
    }

    const hasRole = requiredRoles.includes(user.rol_id);
    if (!hasRole) {
      throw new ForbiddenException('No tienes permisos de Administrador para acceder a este recurso');
    }
    
    return true;
  }
}
