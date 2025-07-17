/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import 'reflect-metadata';
import { NestFactory, Reflector } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './core/interceptor/response.interceptor';
import { HttpExceptionFilter } from './core/exceptions/http-exception.filter';
import { writeFileSync } from 'fs';
import { name } from '../package.json';
import { GlobalErrorCode } from './core/constants/error-code';
import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const reflector = app.get(Reflector);
    app.useGlobalInterceptors(new ResponseInterceptor(reflector));
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            exceptionFactory: (errors) => {
                const result = errors.map((error) => ({
                    status: [
                        error?.contexts?.[Object.keys(error?.contexts)?.[0]]
                            ?.errorCode || GlobalErrorCode.VALIDATION_ERROR,
                    ],
                    data: {
                        message:
                            error.constraints[
                                Object.keys(error.constraints)[0]
                            ],
                    },
                }))[0];
                return new BadRequestException(result);
            },
            stopAtFirstError: true,
        }),
    );

    if (process.env.NODE_ENV !== 'production') {
        const config = new DocumentBuilder()
            .setTitle(`${name} ApiDoc`)
            .setDescription(`${name} API description`)
            .setVersion('1.0')
            .addBearerAuth({
                // I was also testing it without prefix 'Bearer ' before the JWT
                description: `[just text field] Please enter token in following format: Bearer <JWT>`,
                name: 'Authorization',
                bearerFormat: 'Bearer',
                scheme: 'Bearer',
                type: 'http',
                in: 'Header',
            })
            .build();

        const document = SwaggerModule.createDocument(app, config);
        writeFileSync(
            `./${name}_openapi.json`,
            JSON.stringify(document, null, 4),
        );
        SwaggerModule.setup('api', app, document);
    }

    app.enableCors({
        origin: true,
    });

    await app.listen(process.env.PORT, '0.0.0.0');
}
bootstrap();
