import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { PrismaService } from "../services/prisma.service";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    constructor(private readonly prisma: PrismaService) {}

    async catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception instanceof HttpException
            ? exception.getResponse()
            : 'Internal Server Error';

        const errorResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            error: typeof message == 'string'
                ? message
                : (message as any).message || message,
            errorCode: exception.code || 'UNKNOWN_ERROR'
        };

        // Guardar el log en la base de datos antes de regresar el response
        try {
            await this.prisma.logs.create({
                data: {
                    statusCode: status,
                    path: request.url,
                    error: JSON.stringify(errorResponse.error),
                    errorCode: errorResponse.errorCode ? String(errorResponse.errorCode) : 'UNKNOWN_ERROR',
                    session_id: (request as any).user?.id || null,
                }
            });
        } catch (logError) {
            console.error('Error saving log to database:', logError);
        }

        response.status(status).json(errorResponse);
    }
}