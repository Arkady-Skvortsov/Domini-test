import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import UserEntity from 'src/users/entities/users.entity';

@Entity({ name: 'jwt_token' })
export default class JwtTokenEntity {
  @ApiProperty({
    type: Number,
    example: 23,
    description: 'Primary autogenerated key',
  })
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({ type: String, description: 'Refresh token' })
  @Column({ type: String, nullable: false })
  public token: string;

  @ApiProperty({
    type: () => UserEntity,
    example: 'Arkasha',
    description: 'Current user, which has a JWT token',
  })
  @OneToOne(() => UserEntity, (user) => user.jwt_token)
  public user: UserEntity;
}