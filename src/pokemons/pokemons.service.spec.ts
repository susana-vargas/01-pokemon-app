import { Test, TestingModule } from '@nestjs/testing';
import { PokemonsService } from './pokemons.service';

describe('PokemonsService', () => {
  let service: PokemonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonsService],
    }).compile();

    service = module.get<PokemonsService>(PokemonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a pokemon', () => {
    const data = { name: 'Pikachu', type: 'Electric' };
    const result = service.create(data);
    console.log(result);
    expect(result).toBe(`This action adds a ${data.name}`);
  });
});
