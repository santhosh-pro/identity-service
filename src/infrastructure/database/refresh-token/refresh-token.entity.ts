import { WhoColumnEntity } from "src/common/base.entity";
import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class RefreshTokenEntity extends WhoColumnEntity {

    @Column()
    hash!: string;

    @Column()
    username!: string
}