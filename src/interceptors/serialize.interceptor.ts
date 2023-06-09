import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/users/dto/user.dto';

export class SerializeInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> {
    // Run something before a request is handled by the request handler
    return handler.handle().pipe(
      map((data: any) => {
        //  Run something before the response is sent out
        return plainToClass(UserDto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
