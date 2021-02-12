import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMqService } from './rabbit-mq.service';

@Module({
    imports: [
        ClientsModule.register([
            {
              name: 'rabbit-mq-module',
              transport: Transport.RMQ,
              options: {
                urls: [
                  'amqp://guest:guest@localhost:5672',
                ],
                queue: 'product-queue',
              },
            },
          ])
    ],
    controllers: [],
    providers: [
      {
        provide: 'IMessageQueueService',
        useClass: RabbitMqService
      }
    ],
    exports:[
      {
        provide: 'IMessageQueueService',
        useClass: RabbitMqService
      }
    ]
})
export class MessageQueueModule { }
