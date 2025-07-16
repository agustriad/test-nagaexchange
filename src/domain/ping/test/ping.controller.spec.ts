import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { version } from '../../../../package.json';

import { PingController } from '../ping.controller';
import { PingService } from '../ping.service';

describe('PingController', () => {
  let app: INestApplication;
  let controls: PingController;
  let services: PingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PingController],
      providers: [
        PingService,
        {
          provide: PingService,
          useValue: {
            getPing: jest.fn(() => {
              return { version };
            }),
          },
        },
      ],
    }).compile();
    controls = module.get<PingController>(PingController);
    services = module.get<PingService>(PingService);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be define control', async () => {
    expect(controls).toBeDefined();
  });
  it('should be define service', async () => {
    expect(services).toBeDefined();
  });
  it('Get ping', async () => {
    let result = await controls.ping();
    expect(result).toStrictEqual({ version });
  });

  afterAll(async () => {
    await app.close();
  });
});
