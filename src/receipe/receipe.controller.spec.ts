import { Test, TestingModule } from '@nestjs/testing';
import { ReceipeController } from './receipe.controller';

describe('ReceipeController', () => {
  let controller: ReceipeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceipeController],
    }).compile();

    controller = module.get<ReceipeController>(ReceipeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
