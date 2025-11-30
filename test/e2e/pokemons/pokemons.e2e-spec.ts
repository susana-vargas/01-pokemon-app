import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../../../src/app.module';
import { Pokemon } from 'src/pokemons/entities/pokemon.entity';

describe('Pokemons (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    await app.init();
  });

  it('/pokemons (POST) - with no body ', async () => {
    const response = await request(app.getHttpServer()).post('/pokemons');
    //verifica si viene si no es un array vacio
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const messageArray = response.body.message ?? [];

    expect(response.statusCode).toBe(400);
    //se verifica si el mensaje de error contiene los mensajes esperados
    expect(messageArray).toContain('name must be a string');
    expect(messageArray).toContain('name should not be empty');
    expect(messageArray).toContain('type must be a string');
    expect(messageArray).toContain('type should not be empty');

    // return request(app.getHttpServer())
    //   .post('/pokemons')
    //   .expect(200)
    //   .expect('Hello World!!');
  });

  it('/pokemons (POST) - with no body 2', async () => {
    //se verifica lo mismo pero mas limpio
    const response = await request(app.getHttpServer()).post('/pokemons');

    //no importa si vienen en un orden diferente
    const mostHaveErrorMessage = [
      'type should not be empty',
      'name must be a string',
      'type must be a string',
      'name should not be empty',
    ];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const messageArray: string[] = response.body.message ?? [];

    //se verifica la cantidadd de mensajes de error
    expect(mostHaveErrorMessage.length).toBe(messageArray.length);
    //verifica que los errores sean los esperados
    expect(messageArray).toEqual(expect.arrayContaining(mostHaveErrorMessage));
  });

  it('/pokemons (POST) - with valid body', async () => {
    const response = await request(app.getHttpServer()).post('/pokemons').send({
      name: 'Pikachu',
      type: 'Electric',
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      name: 'Pikachu',
      type: 'Electric',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      id: expect.any(Number),
      hp: 0,
      sprites: [],
    });
  });

  it('/pokemons (GET) should return paginated list of pokemons', async () => {
    //crea un cliente HTTP de prueba (Supertest) que permite llamar a endpoints dentro
    //del test sin necesitar un servidor real
    const response = await request(app.getHttpServer())
      .get('/pokemons')
      .query({ limit: 5, page: 1 });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(response.body.length).toBe(5);

    //verifica que cada pokemon recibido tenga las propiedades de acuerdo al tipo
    (response.body as Pokemon[]).forEach((pokemon) => {
      expect(pokemon).toHaveProperty('id');
      expect(pokemon).toHaveProperty('name');
      expect(pokemon).toHaveProperty('type');
      expect(pokemon).toHaveProperty('hp');
      expect(pokemon).toHaveProperty('sprites');
    });
  });

  it('/pokemons/:id (GET) should return a Pokémon by ID', async () => {
    const response = await request(app.getHttpServer()).get('/pokemons/1');

    const pokemon = response.body as Pokemon;

    expect(response.statusCode).toBe(200);
    expect(pokemon).toEqual({
      id: 1,
      name: 'bulbasaur',
      type: 'grass',
      hp: 45,
      sprites: [
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
      ],
    });
  });

  it('/pokemons/:id (GET) should return Not found', async () => {
    const pokemonId = 400_001;
    const response = await request(app.getHttpServer()).get(
      `/pokemons/${pokemonId}`,
    );

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      message: `Pokemon with id ${pokemonId} not found`,
      error: 'Not Found',
      statusCode: 404,
    });
  });

  it('/pokemons/:id (PATCH) should update pokemon', async () => {
    const pokemonId = 1;
    const dto = { name: 'Pikachu', type: 'Electric' };
    const pokemonResponse = await request(app.getHttpServer()).get(
      `/pokemons/${pokemonId}`,
    );

    const bulbasaur = pokemonResponse.body as Pokemon;

    const response = await request(app.getHttpServer())
      .patch(`/pokemons/${pokemonId}`)
      .send(dto);

    const updatedPokemon = response.body as Pokemon;

    // expect(bulbasaur).toEqual(updatedPokemon);
    expect(bulbasaur.hp).toBe(updatedPokemon.hp);
    expect(bulbasaur.id).toBe(updatedPokemon.id);
    expect(bulbasaur.sprites).toEqual(updatedPokemon.sprites);
    expect(updatedPokemon.name).toBe(dto.name);
    expect(updatedPokemon.type).toBe(dto.type);
  });

  it('/pokemons/:id (PATCH) should throw an 404', async () => {
    const id = 4_000_000;

    const pokemonResponse = await request(app.getHttpServer())
      .patch(`/pokemons/${id}`)
      .send({});

    expect(pokemonResponse.statusCode).toBe(404);
  });
});
