import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import PresentEntity from './entities/present.entity';

@Injectable()
export class PresentService {
  constructor(
    @InjectRepository(PresentEntity)
    private presentEntity: Repository<PresentEntity>,
    private usersService: UsersService,
  ) {}

  async send_present() {}

  async get_last_present() {}
}
