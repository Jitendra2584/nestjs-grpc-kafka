import { PetEntity } from './pet.graphql.entity';
import { UserEntity } from './user.entity';
import { OwnerEntity } from './owner.graphql.entity';

const Entities = {
  'user-table': UserEntity,
  pet: PetEntity,
  owner: OwnerEntity,
};

export const entities = Object.values(Entities);

export { UserEntity, PetEntity, OwnerEntity };
