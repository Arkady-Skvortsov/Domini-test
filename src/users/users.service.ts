import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RecourceOperationDTO, { resourceType, resuorces } from './dto/users.dto';
import UserEntity from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
  ) {}

  async get_current_resources(id: number): Promise<resuorces<number>> {
    const { coins, cristaly } = await this.get_current_user(id);

    return {
      coins,
      cristaly,
    };
  }

  async add_resources(data: RecourceOperationDTO<number>) {
    let current_resource = await this.choose_resources(
      data.id,
      data.resource_type,
    );

    return (current_resource += data.count);
  }

  async increase_resources(data: RecourceOperationDTO<number>) {
    let current_resource = await this.choose_resources(
      data.id,
      data.resource_type,
    );

    return (current_resource -= data.count);
  }

  async invite_in_friends(sender: number, catcher: number) {
    return `sender ${sender} send invite to the friends to ${catcher} catcher`;
  }

  private async get_current_user(id: number) {
    const current_user = await this.userEntity.findOne({ where: { id: id } });

    return current_user;
  }

  private async choose_resources(id: number, resourceType: resourceType) {
    const current_user = await this.get_current_user(id);

    if (resourceType === 'Кристал') return current_user.cristaly;

    if (resourceType === 'Монета') return current_user.coins;
  }
}
