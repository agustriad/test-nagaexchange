/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Query, Param, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ExampleService } from './example.service';
import 'dotenv/config';

@Controller({
    path: 'path',
})
export class ExampleServiceController {
    constructor(private readonly exampleService: ExampleService) {}

    @Get('/list')
    @ApiTags('example')
    @ApiOperation({ summary: 'example:: get list' })
    @ApiBearerAuth('access-token')
    getList(@Query() _query: any, @Request() _req: any, @Param() _params: any) {
        /**
         * to statement service
         */
    }
}
