import { Inject, Injectable } from "@nestjs/common";
import { IMessageQueueService } from "./i.message-queue.service";
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMqService implements IMessageQueueService {
  constructor(
    @Inject('rabbit-mq-module') private readonly client: ClientProxy
  ) { }

  async publish(pattern: string, data: any) {    
    return await this.client.send(pattern, data).toPromise();
  }
} 