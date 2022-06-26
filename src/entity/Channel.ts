import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';

@ObjectType()
@Entity()
export default class Channel {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  subscriberCount: number;

  @Field()
  @OneToOne(() => User, user => user.channel)
  @JoinColumn()
  user: User;
}
