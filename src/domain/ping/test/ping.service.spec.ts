import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { version } from '../../../../package.json';

import { PingService } from '../ping.service';

import { createMock } from '@golevelup/ts-jest';

describe('PingService', () => {
  let app: INestApplication;
  let services: PingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PingService],
    })
      .useMocker(createMock)
      .compile();

    services = module.get<PingService>(PingService);
    app = module.createNestApplication();
    await app.init();
  });

  it('services should be define', () => {
    expect(services).toBeDefined();
  });

  it('should be get ping with response success', async () => {
    let result = await services.getPing();
    expect(result).toStrictEqual({ version });
  });

  afterAll(async () => {
    await app.close();
  });
});
