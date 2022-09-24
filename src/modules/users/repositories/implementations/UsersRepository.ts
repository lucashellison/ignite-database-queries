import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository
      .createQueryBuilder("users")
      .innerJoinAndSelect("users.games","games")
      .where(`users.id = '${user_id}'`)
      .getOne()
    return user!;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query(`SELECT * FROM USERS ORDER BY FIRST_NAME`); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(`SELECT * FROM USERS WHERE UPPER(FIRST_NAME) = UPPER($1) AND UPPER(LAST_NAME) = UPPER($2)`,[first_name,last_name]); // Complete usando raw query
  }
}
