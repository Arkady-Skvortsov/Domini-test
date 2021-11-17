import { Test, TestingModule } from '@nestjs/testing';
import { PresentGateway } from './present.gateway';

describe('PresentGateway', () => {
  let gateway: PresentGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PresentGateway],
    }).compile();

    gateway = module.get<PresentGateway>(PresentGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
