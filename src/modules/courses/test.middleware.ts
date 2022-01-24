import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class TestMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {

    console.log('Executing Test Middleware, This take 5 seconds...')
    for (let i = 0; i < 5; i++) {
      const result = await new Promise(resolve => setTimeout(() => resolve(`${5 - i} seconds`), 1000))
      console.log(result)
    }
    console.log('Middleware Finished')

    next();
  }
}
