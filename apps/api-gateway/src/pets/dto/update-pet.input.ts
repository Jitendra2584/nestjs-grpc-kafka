import { IsInt, IsNotEmpty } from 'class-validator';
import { CreatePetInput } from './create-pet.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

@InputType()
export class UpdatePetInput extends PartialType(CreatePetInput) {
  @Field(() => Int)
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  id: number;
}
