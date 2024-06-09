import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class SerializeInterceptor implements NestInterceptor {
    intercept(_context: ExecutionContext, handler: CallHandler<any>): Observable<any>;
}
