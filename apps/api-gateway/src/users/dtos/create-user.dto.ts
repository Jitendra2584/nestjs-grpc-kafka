import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

import { Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
    example: 'jagga',
    description: 'The username of the User',
  })
  @IsNotEmpty()
  @IsString()
  username!: string;

  @ApiProperty({
    type: 'string',
    example: 'password',
    description: 'The password of the User',
  })
  @IsNotEmpty()
  @IsString()
  password!: string;

  @ApiProperty({
    type: 'number',
    example: 25,
    description: 'The age of the User',
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  age!: number;

  @ApiProperty({
    type: 'string',
    example: 'James@gmail.com',
    description: 'The email of the User',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!: string;
}
