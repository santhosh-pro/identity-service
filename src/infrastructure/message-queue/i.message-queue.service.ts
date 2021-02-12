export interface IMessageQueueService {
    publish(pattern: string, data: any):Promise<any>;
}