"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const cors = require("cors");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        exceptionFactory: (errors) => {
            return new common_1.HttpException({ message: 'Validation failed', errors }, common_1.HttpStatus.BAD_REQUEST);
        },
    }));
    app.use(cors({
        credentials: true,
        origin: ['http://localhost:5173', 'https://wik-land-front.vercel.app'],
    }));
    app.use(cookieParser());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map