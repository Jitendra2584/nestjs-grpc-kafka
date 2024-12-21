import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsAlpha,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class CreatePetInput {
  @Field({ description: 'The name of the pet' })
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString({ message: 'Name must be a string' })
  @IsAlpha()
  name: string;

  @Field({ nullable: true, description: 'The type of the pet' })
  @IsOptional()
  @IsString({ message: 'Type must be a string' })
  type?: string;

  @Field({ description: 'The owner id of the pet' })
  @IsNotEmpty({ message: 'Owner id should not be empty' })
  @Type(() => Number)
  @IsInt()
  ownerId: number;
}
