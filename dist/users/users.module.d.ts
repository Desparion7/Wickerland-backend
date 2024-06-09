import { NestModule } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common';
export declare class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void;
}
