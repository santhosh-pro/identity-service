import { EventSubscriber, EntitySubscriberInterface, InsertEvent, Connection } from 'typeorm'
import { InjectConnection } from '@nestjs/typeorm'
import { WhoColumnEntity } from 'src/common/base.entity'


@EventSubscriber()
export class AllEntitiesSubscriber implements EntitySubscriberInterface {
    
  constructor (
    @InjectConnection() readonly connection: Connection,
  ) {    
    connection.subscribers.push(this)        
  }
    beforeInsert(event: InsertEvent<WhoColumnEntity>) {        
      event.entity.createdBy = '2',
      event.entity.createdOn=new Date(),
      event.entity.updatedBy='4',
      event.entity.updatedOn=new Date()
    }

    beforeUpdate(event: InsertEvent<WhoColumnEntity>) {
        event.entity.updatedBy='4',
        event.entity.updatedOn=new Date()
    }

}