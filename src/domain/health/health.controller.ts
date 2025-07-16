import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import {
    HealthCheckService,
    HttpHealthIndicator,
    HealthCheck,
    TypeOrmHealthIndicator,
    MemoryHealthIndicator,
} from '@nestjs/terminus';
import 'dotenv/config';

@Controller('health')
export class HealthController {
    constructor(
        private readonly health: HealthCheckService,
        private readonly http: HttpHealthIndicator,
        private readonly db: TypeOrmHealthIndicator,
        private readonly memory: MemoryHealthIndicator,
    ) {}

    @Get()
    @HealthCheck()
    async check(@Res() res: Response) {
        let resultCheck: any = null;
        try {
            resultCheck = await this.health.check([
                () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
                () =>
                    this.http.pingCheck(
                        'service',
                        `http://localhost:${process.env.PORT}/ping`,
                    ),
                () => this.db.pingCheck('database'),
            ]);
        } catch (e) {
            resultCheck = e.response;
        }

        // step by step
        const stepConditionCheck = {
            memory_heap: {
                code: 513,
                message: 'Memory heap health check failed',
            },
            service: { code: 503, message: 'Service health check failed' },
            database: { code: 512, message: 'Database health check failed' },
        };

        let keysDetails = Object.keys(resultCheck.details);
        let check = null;
        for (let i = 0; i <= keysDetails.length; i++) {
            if (resultCheck.details[keysDetails[i]]?.status !== 'up') {
                check = stepConditionCheck[keysDetails[i]];
                i = keysDetails.length;
            }
        }

        if (check) {
            return res
                .status(check?.code)
                .json({ message: check?.message, detail: resultCheck.details });
        } else {
            return res.status(200).json({
                message: 'All health checks passed',
                detail: resultCheck.details,
            });
        }
    }
}
