import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RegDTO from 'src/auth/dto/reg.dto';
import RecourceOperationDTO, {
  resourceType,
  resuorces,
  UpdateUserDTO,
} from './dto/users.dto';
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

  async resource_operation(
    operation_type: string,
    data: RecourceOperationDTO<number>,
  ) {
    let current_resource = await this.choose_resources(
      data.id,
      data.resource_type,
    );

    if (operation_type === 'increase') return (current_resource += data.count);

    if (operation_type === 'decrease') return (current_resource -= data.count);
  }

  async get_current_user(id: number) {
    const current_user = await this.userEntity.findOne(id);

    return current_user;
  }

  async create_user(dto: RegDTO<string, number>) {
    const new_user = await this.userEntity.create(dto);

    await this.userEntity.save(new_user);

    return new_user;
  }

  async update_current_user(username: string, dto: UpdateUserDTO) {
    const current_user = await this.get_current_user_by_username(username);

    await this.userEntity.update(current_user, dto);

    return current_user;
  }

  async get_current_user_by_username(username: string) {
    const current_user = await this.userEntity.findOne({ where: { username } });

    return current_user;
  }

  private async choose_resources(id: number, resourceType: resourceType) {
    const current_user = await this.get_current_user(id);

    if (resourceType === 'Кристалы') return current_user.cristaly;

    if (resourceType === 'Монеты') return current_user.coins;
  }
}
