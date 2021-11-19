import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PresentModule } from './present/present.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      port: +process.env.PG_PORT,
      host: process.env.PG_HOST,
      entities: ['../dist/**/*.entity.{ts, js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),

    PresentModule,
    AuthModule,
  ],
})
export default class AppModule {}
