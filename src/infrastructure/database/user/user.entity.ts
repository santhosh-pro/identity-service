import { AuditColumn } from 'src/common/audit-column.entity';
import { Entity, Column, BeforeInsert, ManyToOne, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { UserRole } from '../user-role/user-role.entity';

@Entity()
export class User extends AuditColumn {

  @Column()
  name!: string;

  @Column()
  username!: string;

  @Column({
    unique: true
  })
  email!: string;

  @Column({ length: 60 })
  password!: string;

  @OneToMany(() => UserRole, userRole => userRole.user)
  userRoles!:UserRole[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

}