import { Module } from '@nestjs/common';
import { ReceipeModule } from './receipe/receipe.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipe } from './receipe/entity/receipe.entity';
import { Ingredients } from './receipe/entity/ingredients.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import configuration from './config/app.config';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';

interface DatabseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    ReceipeModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databseConfig: DatabseConfig =
          configService.get<DatabseConfig>('database');
        return {
          type: 'postgres',
          host: databseConfig.host,
          port: databseConfig.port,
          username: databseConfig.username,
          password: databseConfig.password,
          database: databseConfig.database,
          entities: [Receipe, Ingredients, User],
          synchronize: databseConfig.synchronize, // this property value will be false in production
          logging: databseConfig.logging,
        };
      },
    }),
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}

/* 

{
      type: 'postgres',
      host: '0.0.0.0',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'food',
      entities: [Receipe, Ingredients],
      synchronize: true,
      logging: true,
    }
*/
