import { ApiProperty } from '@nestjs/swagger';
import { resourceType } from 'src/users/dto/users.dto';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import UserEntity from '../../users/entities/users.entity';

@Entity({ name: 'presents' })
export default class PresentEntity {
  @ApiProperty({
    type: Number,
    example: 20,
    description: 'Primary autogenerated key for the table',
  })
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({
    type: String,
    description: 'Title of the current present',
    example: 'Present #1',
  })
  @Column({ type: 'varchar', nullable: false })
  public title: string;

  @ApiProperty({
    type: () => UserEntity,
    example: 'Sergey',
    description: 'User, which send',
  })
  @ManyToOne(() => UserEntity, (user) => user)
  public sender: UserEntity;

  @ApiProperty({
    type: () => UserEntity,
    example: 'Arkasha',
    description: 'User, which catch a current present from other user',
  })
  @ManyToOne(() => UserEntity, (user) => user)
  public recipient: UserEntity;

  @ApiProperty({
    type: Number,
    example: 2000,
    description: 'Resources, which player want to send to other user',
  })
  @Column({ type: 'int', nullable: false, default: 100 })
  public resources: number;

  @Column({ type: 'varchar', nullable: false })
  public resourcesType: resourceType;
}
