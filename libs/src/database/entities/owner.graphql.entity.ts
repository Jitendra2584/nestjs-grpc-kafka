import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PetEntity } from './pet.graphql.entity';

@Entity('owner')
@ObjectType()
export class OwnerEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  name: string;

  @OneToMany(() => PetEntity, (pet) => pet.owner)
  @Field(() => [PetEntity], { nullable: true })
  pets?: PetEntity[];
}
