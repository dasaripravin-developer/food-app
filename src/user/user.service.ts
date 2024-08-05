import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userRepository.save(createUserDto);
    } catch (err) {
      return err;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (err) {
      return err;
    }
  }

  async findOne(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (err) {
      return err;
    }
  }

  async update(email: string, updateUserDto: UpdateUserDto): Promise<any> {
    try {
      return await this.userRepository.update({ email }, updateUserDto);
    } catch (err) {
      return err;
    }
  }

  async remove(email: string): Promise<any> {
    try {
      return await this.userRepository.delete({ email });
    } catch (err) {
      return err;
    }
  }
}
