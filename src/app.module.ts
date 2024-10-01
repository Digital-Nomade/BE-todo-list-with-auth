import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import orm from './config/orm.config';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [orm],
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: orm,
      inject: [ConfigService],
    }),
    AuthModule,
    TodoModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
