import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;
  private usersRepository: Repository<User>;

  constructor() {
    this.repository = getRepository(Game);
    this.usersRepository = getRepository(User);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    // Complete usando query builder
    const games = await this.repository
      .createQueryBuilder("games")
      .where(`upper(games.title) like upper('%${param}%')`)
     .getMany()
      
    return games!;
     
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query(`SELECT COUNT(*) count FROM GAMES`); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    // Complete usando query builder
    const users = await this.usersRepository
      .createQueryBuilder("users")
      .innerJoinAndSelect("users.games","games")
      .where(`games.id = '${id}'`)
      .getMany()

    return users!;
      
  }
}
