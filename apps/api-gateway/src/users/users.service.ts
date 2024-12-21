import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from '@libs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(body: CreateUserDto): Promise<UserEntity> {
    // Check if username already exists
    const [existingUserByUsername, existingUserByEmail] = await Promise.all([
      this.userRepository.findOne({
        where: { username: body.username },
      }),
      this.userRepository.findOne({
        where: { email: body.email },
      }),
    ]);

    // Check if username already exists
    if (existingUserByUsername) {
      throw new BadRequestException('Username already exists');
    }

    // Check if email already exists
    if (existingUserByEmail) {
      throw new BadRequestException('Email already exists');
    }

    const user = await this.userRepository.save({
      username: body.username,
      password: body.password,
      age: body.age,
      email: body.email,
    });

    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (Object.keys(updateUserDto).length === 0) {
      throw new BadRequestException('No data to update');
    }
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const updatedData = {
      socialMedia: updateUserDto.socialMedia
        ? updateUserDto.socialMedia
        : user.socialMedia,
      age: updateUserDto.age ? updateUserDto.age : user.age,
      username: updateUserDto.age ? updateUserDto.username : user.username,
    };

    await this.userRepository.update(id, updatedData);

    return await this.userRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    await this.userRepository.softDelete(id);
    return user;
  }
}
