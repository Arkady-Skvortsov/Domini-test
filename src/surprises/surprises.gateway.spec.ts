import { Test, TestingModule } from '@nestjs/testing';
import { SurprisesGateway } from './surprises.gateway';

describe('SurprisesGateway', () => {
  let gateway: SurprisesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurprisesGateway],
    }).compile();

    gateway = module.get<SurprisesGateway>(SurprisesGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
