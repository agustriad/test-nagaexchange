import { Injectable } from '@nestjs/common';
import { version } from '../../../package.json';

@Injectable()
export class PingService {
  async getPing(): Promise<{ version: string }> {
    return {
      version,
    };
  }
}
