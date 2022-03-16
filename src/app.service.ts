import { Injectable } from '@nestjs/common';
import { Razorpay } from 'razorpay-typescript';
import { IRazorOrder } from 'razorpay-typescript/dist/resources/order';
import { generate } from 'shortid';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getPayment(): Promise<any> {
    const razorConfig = {
      authKey: {
        key_id: process.env.KEY_ID,
        key_secret: process.env.KEY_SECRET,
      },
      headers: {},
    };
    const razorpay = new Razorpay(razorConfig);
    const payment_capture = 1;
    const amount = 499;
    const currency = 'INR';
    const options: IRazorOrder = {
      amount: amount * 100,
      currency,
      receipt: generate(),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      return {
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      };
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
