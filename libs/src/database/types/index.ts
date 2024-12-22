import { UserEntity } from '../entities';

export type ReturnUserType = Omit<UserEntity, 'password' | 'refreshToken'>;
