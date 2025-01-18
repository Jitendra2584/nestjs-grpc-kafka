/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ReturnUserType, UserEntity } from '@libs';
import { hash } from 'bcryptjs';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(body: CreateUserDto): Promise<ReturnUserType> {
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

    const hashedPassword = await hash(body.password, 10);

    const user = await this.userRepository.save({
      username: body.username,
      password: hashedPassword,
      age: body.age,
      email: body.email,
    });

    const { password, refreshToken, ...result } = user;

    return result;
  }

  async findAll(): Promise<ReturnUserType[]> {
    return await this.userRepository.find({
      select: [
        'id',
        'username',
        'age',
        'email',
        'socialMedia',
        'subscribed',
        'created_at',
        'updated_at',
        'deleted_at',
      ],
    });
  }

  async findOne(id: string): Promise<ReturnUserType> {
    const { password, refreshToken, ...result } =
      await this.userRepository.findOne({ where: { id } });
    return result;
  }

  async findOneByUsername(username: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { username } });
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

    const { password, refreshToken, ...result } =
      await this.userRepository.findOne({ where: { id } });
    return result;
  }

  async updateRefreshToken(username: string, refreshToken: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    await this.userRepository.update(user.id, { refreshToken });

    const { password, ...result } = user;
    return result;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const { password, refreshToken, ...result } = user;

    await this.userRepository.softDelete(id);
    return result;
  }

  @Cron(CronExpression.EVERY_2_HOURS) // here you can set the cron expression e.g '0 * * * * *' for every minute
  handleCron() {
    this.logger.debug('Called when the current second is 0');
    // Add your cron job logic here
  }
}
