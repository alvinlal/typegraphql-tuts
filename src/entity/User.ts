import { Field, ObjectType, ID, Root } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import Channel from './Channel';

@ObjectType()
@Entity()
export default class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column()
  lastname: string;

  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstname} ${parent.lastname}`;
  }

  @Field()
  @Column('varchar', { unique: true })
  email: string;

  @Column()
  password: string;

  @Field()
  @Column('bool', { default: false })
  confirmed: boolean;

  channel: Channel;
}
