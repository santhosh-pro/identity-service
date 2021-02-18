import { AuditColumn } from "src/common/audit-column.entity";
import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class RefreshToken extends AuditColumn {

    @Column()
    hash!: string;

    @Column()
    username!: string
}