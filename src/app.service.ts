import { Injectable } from '@nestjs/common'
import { SWApiService } from './sw-api'
@Injectable()
export class AppService {
  constructor(private readonly swApiService: SWApiService) {}
  async getHello() {
    return 'Hello World!'
    // return this.swApiService.getById('unknown', '1')
  }
}
