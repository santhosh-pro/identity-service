import { BaseEntity } from 'src/common/base.entity';
import { Entity, Column, BeforeInsert, ManyToOne, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { UserRoleEntity } from '../user-role/user-role.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {

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

  @OneToMany(() => UserRoleEntity, userRole => userRole.user)
  userRoles!:UserRoleEntity[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

}