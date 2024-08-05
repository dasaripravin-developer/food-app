import { Module } from '@nestjs/common';
import { ReceipeController } from './receipe.controller';
import { ReceipeService } from './receipe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipe } from './entity/receipe.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  controllers: [ReceipeController],
  providers: [ReceipeService, { provide: APP_GUARD, useClass: AuthGuard }],
  imports: [TypeOrmModule.forFeature([Receipe])],
})
export class ReceipeModule {}
