# Como usar los `scripts`

```json
"scripts": {
  "build": "npm run test && nest build",
  "format": "prettier --write \"src/**/\*.ts\" \"test/**/_.ts\"",
  "start": "nest start",
  "start:dev": "nest start --watch",
  "start:debug": "nest start --debug --watch",
  "start:prod": "node dist/main",
  "lint": "eslint \"{src,apps,libs,test}/\*\*/_.ts\" --fix",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:cov": "jest --coverage",
  "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
  "test:e2e": "jest --config ./test/jest-e2e.json"
},
```

- **"test"**: `npm run test`: Ejecuta el test completo, `expect()` de `app.controller.spec.ts`
- **"build"**: `npm run build`, si en jest hay una excepción no debería de construirse el build
- **"test:watch"**: `npm run test:watch`: Entra en un modo de observación, donde cada vez que guardes un archivo se vuelven a ejecutar los tests
- **"test:cov"**: `npm run test:cov`: Genera un reporte de cobertura, es dcecir, que se crea una carpeta `coverage` donde se indica qué tanto del código está siendo cubierto por los tests, muestra los archivos que fueron probados y los que no
- **"test:debug"**: `npm run test:debug`: Permite hacer debug de los tests, puedes poner un breakpoint en el código y correr este script para que se detenga en ese punto y puedas inspeccionar variables.
  hay mas opciones:
- Para esto igual se puede ir a `package.json`, seleccionar el > Debug y6 seleccionar el test:watch.
- se seleccina una paleta de comandos en: View -> Command Palette -> Debug: npm script -> npm script -> test:watch
  entra e proceso de depuración y toma el debyg
- **"test:e2e"**: `npm run test:e2e`: Ejecuta pruebas de extremo a extremo (end-to-end) que simulan el comportamiento del usuario final para verificar que todo el sistema funcione correctamente. (`app.e2e-spec.ts`)
