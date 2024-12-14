import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min, NotEquals } from 'class-validator';

import { Type } from 'class-transformer';
import { SocialMedia } from '@libs-common';

export class UpdateUserDto {
  @ApiPropertyOptional({
    type: 'string',
    example: 'jagga',
    description: 'The username of the User',
  })
  @IsOptional()
  @IsString()
  @NotEquals(null)
  username!: string;

  @ApiPropertyOptional({
    type: 'number',
    example: 25,
    description: 'The age of the User',
  })
  @IsOptional()
  @NotEquals(null)
  @IsInt()
  @Min(0)
  @Type(() => Number)
  age!: number;

  @ApiPropertyOptional({
    type: 'object',
    additionalProperties: {},
    example: {
      facebook: 'https://facebook.com/jagga',
      twitter: 'https://twitter.com/jagga',
      linkedin: 'https://linkedin.com/jagga',
      instagram: 'https://instagram.com/jagga',
    },
    description: 'The social media links of the User',
  })
  @IsOptional()
  @Type(() => Object)
  @NotEquals(null)
  socialMedia: SocialMedia;
}
