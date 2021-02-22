import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['host'])
export class Tenant {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @PrimaryColumn()
    host!: string;

    @Column()
    name!: string;

}