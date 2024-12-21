import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnerEntity } from '@libs';
import { Repository } from 'typeorm';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(OwnerEntity)
    private readonly ownerRepository: Repository<OwnerEntity>,
  ) {}
  create(createOwnerInput: CreateOwnerInput): Promise<OwnerEntity> {
    const owner = this.ownerRepository.create(createOwnerInput);
    return this.ownerRepository.save(owner);
  }

  findAll() {
    return this.ownerRepository.find();
  }

  findOne(id: number) {
    return this.ownerRepository.findOne({ where: { id } });
  }

  async update(id: number, updateOwnerInput: UpdateOwnerInput) {
    const owner = await this.findOne(id);
    if (!owner) {
      throw new NotFoundException('Owner not found');
    }
    await this.ownerRepository.update(id, updateOwnerInput);
    return this.findOne(id);
  }

  async remove(id: number) {
    const owner = await this.findOne(id);
    if (!owner) {
      throw new NotFoundException('Owner not found');
    }
    await this.ownerRepository.delete(id);
    return owner;
  }
}
