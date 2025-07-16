import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PingService } from './ping.service';

@ApiTags('Ping')
@Controller()
export class PingController {
    constructor(private readonly pingService: PingService) {}

    @Get('ping')
    async ping(): Promise<any> {
        return this.pingService.getPing();
    }
}
