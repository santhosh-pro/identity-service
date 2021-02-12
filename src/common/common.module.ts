import { Module } from '@nestjs/common';
import { AllEntitiesSubscriber } from './all-entities-subscriber';

@Module({
    imports: [],
    controllers: [],
    providers: [
        AllEntitiesSubscriber
    ],
    exports:[

    ]
})
export class CommonModule { }
