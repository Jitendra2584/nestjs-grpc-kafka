import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { OwnerEntity, PetEntity } from '@libs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OwnersService } from '../owners/owners.service';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(PetEntity) private petsRepository: Repository<PetEntity>,
    private readonly ownersService: OwnersService,
  ) {}

  create(createPetInput: CreatePetInput): Promise<PetEntity> {
    const result = this.petsRepository.create(createPetInput);

    return this.petsRepository.save(result);
  }

  findAll(): Promise<PetEntity[]> {
    return this.petsRepository.find({ relations: ['owner'] });
  }

  findOne(id: number): Promise<PetEntity> {
    const pet = this.petsRepository.findOne({ where: { id } });
    if (!pet) {
      throw new NotFoundException('Pet not found');
    }
    return pet;
  }

  async update(id: number, updatePetInput: UpdatePetInput): Promise<PetEntity> {
    const pet = await this.petsRepository.findOne({ where: { id } });
    if (!pet) {
      throw new NotFoundException('Pet not found');
    }
    await this.petsRepository.update(id, updatePetInput);
    return this.petsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<PetEntity> {
    const pet = await this.petsRepository.findOne({ where: { id } });
    if (!pet) {
      throw new NotFoundException('Pet not found');
    }
    await this.petsRepository.delete(id);
    return pet;
  }

  async getOwner(ownerId: number): Promise<OwnerEntity> {
    return await this.ownersService.findOne(ownerId);
  }
}
