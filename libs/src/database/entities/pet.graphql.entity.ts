import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OwnerEntity } from './owner.graphql.entity';

@Entity('pet')
@ObjectType()
export class PetEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Field({ nullable: true })
  type?: string;

  @Column()
  @Field(() => Int)
  ownerId: number;

  @ManyToOne(() => OwnerEntity, (owner) => owner.pets)
  @Field(() => OwnerEntity)
  owner: OwnerEntity;
}
