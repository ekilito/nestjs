import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  log(message) {
    console.log('LoggerService', message)
  }
}

@Injectable()
export class UseValueService {
  // constructor(prefix: string) {
  //   console.log('UseValueService', prefix)
  // }
  log(message) {
    console.log('UseValueService', message)
  }
}