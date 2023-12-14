import { Injectable } from '@nestjs/common'
import { SWApiService } from './sw-api'
@Injectable()
export class AppService {
  constructor(private readonly swApiService: SWApiService) {}
  getHello(): string {
    this.swApiService.testCache()
    return 'Hello World!'
  }
}
