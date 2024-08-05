import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReceipeDto } from './dto/receipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Receipe } from './entity/receipe.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfigValidation } from 'src/config/validation.config';

@Injectable()
export class ReceipeService {
  constructor(
    @InjectRepository(Receipe) private receipeRepository: Repository<Receipe>
  ) {}
  async getReceipe(): Promise<Receipe[]> {
    return await this.receipeRepository.find();
  }

  async addReceipe(receipeData: ReceipeDto): Promise<void> {
    await this.receipeRepository.save(receipeData);
  }

  async updateReceipe(id: string, description: string): Promise<void> {
    try {
    await this.receipeRepository.update({ id }, { description });
    } catch(err) {
       console.log('Erro => ', err)
    }
  }

  async deleteReceipe(id: string): Promise<void> {
    await this.receipeRepository.delete({ id });
  }

  async getReceipeById(id: string): Promise<Receipe> {
    const receipe = await this.receipeRepository.findOne({ where: { id } });
    if (!receipe) {
      throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
    }
    return receipe;
  }
}
