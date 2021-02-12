import { Connection } from "typeorm";

export interface IUnitOfWork {
  start(): void;
  complete(work: () => any): Promise<any>;
  getConnection(): Connection;
  closeConnection():Promise<void>;
  }