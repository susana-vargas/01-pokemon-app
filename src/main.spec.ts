import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { bootstrap } from './main';

//se pone como dato mock para simular el comportamiento de la app levantada
jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn().mockResolvedValue({
      useGlobalPipes: jest.fn(),
      setGlobalPrefix: jest.fn(),
      listen: jest.fn(),
    }),
  },
}));

describe('Main.ts Bootstrap', () => {
  let mockApp: {
    useGlobalPipes: jest.Mock;
    setGlobalPrefix: jest.Mock;
    listen: jest.Mock;
  };

  //indica que se ejecuta antes de cada prueba unitaria
  beforeEach(() => {
    //se inicializa la aplicacion
    mockApp = {
      useGlobalPipes: jest.fn(),
      setGlobalPrefix: jest.fn(),
      listen: jest.fn(),
    };

    //se configura el mock para que devuelva la aplicacion simulada
    (NestFactory.create as jest.Mock).mockResolvedValue(mockApp);
  });

  it('should create application', async () => {
    await bootstrap();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
  });

  it('should set global prefix', async () => {
    await bootstrap();
    //se prueba el prefix de la url 'api/pokemon'
    expect(mockApp.setGlobalPrefix).toHaveBeenCalledWith('api');
  });

  it('should listen on port 3000 if env port not set', async () => {
    await bootstrap();
    //espera a que cuando la app se levante sea en el puerto 3000
    expect(mockApp.listen).toHaveBeenCalledWith(3000);
  });

  //que si se configura el puerto que use ese puerto
  it('should listen on env port', async () => {
    process.env.PORT = '4200';

    await bootstrap();

    expect(mockApp.listen).toHaveBeenCalledWith(process.env.PORT);
  });

  it('should use global pipes', async () => {
    await bootstrap();

    //verifica que useGlobalPipes() se haya llamado
    //Y que se le paso un objeto con configuracion correcta
    expect(mockApp.useGlobalPipes).toHaveBeenCalledWith(
      expect.objectContaining({
        errorHttpStatusCode: 400,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        validatorOptions: expect.objectContaining({
          forbidNonWhitelisted: true,
          whitelist: true,
        }),
      }),
    );
  });
});
