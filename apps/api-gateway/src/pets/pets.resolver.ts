import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { OwnerEntity, PetEntity } from '@libs';

@Resolver(() => PetEntity)
export class PetsResolver {
  constructor(private readonly petsService: PetsService) {}

  @Mutation(() => PetEntity)
  createPet(@Args('createPetInput') createPetInput: CreatePetInput) {
    return this.petsService.create(createPetInput);
  }

  @Query(() => [PetEntity], { name: 'pets' })
  async findAll(): Promise<PetEntity[]> {
    const data = await this.petsService.findAll();
    console.log(data);
    return data;
  }

  @Query(() => PetEntity, { name: 'pet' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.petsService.findOne(id);
  }

  @ResolveField(() => OwnerEntity)
  getOwner(@Parent() { ownerId }: PetEntity) {
    return this.petsService.getOwner(ownerId);
  }

  @Mutation(() => PetEntity)
  async updatePet(@Args('updatePetInput') updatePetInput: UpdatePetInput) {
    return await this.petsService.update(updatePetInput.id, updatePetInput);
  }

  @Mutation(() => PetEntity)
  async removePet(@Args('id', { type: () => Int }) id: number) {
    return await this.petsService.remove(id);
  }
}
