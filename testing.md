Las pruebas deben ser:

- faciles de escribir
- faciles de leer
- rapidas de ejecutar

Si est no se completa correctamente puede ser que las pruebas esten mal implementadas

# Test unitarios

Enfocada en partes atomicas o unicas de una sola sección o archivo

- Pruebas automaticas simples
- Se recomienda no tener dependencias de otros componentes
- Deben ser pruebas para una sola pieza de funcionalidad, la que se esta probando

# Test Integración

Se enfoca en la interacción entre diferentes módulos o componentes para asegurar que funcionen juntos correctamente.

- Es el como funciona en conjuto de mas modulos o servicios

# Test E2E End to End

Ejecua todo en un flujo completo como si fuera el proceso que realiza un usuario

- flujo aislado
- objetivo especifico
- pruebas de casos improbables o variados

# Test jest

est es un framework de pruebas para JavaScript.

Sirve para comprobar que tu código funciona correctamente y evitar errores al ir creciendo el proyecto.

Se pueden hacer pruebas con jest de diferentes tipos:

- Unitarias -- Una función pequeña
- Integración -- Cómo trabajan varias partes juntas
- E2E -- Comportamiento completo como lo haría un usuario

# Piesas necesarias para los casos de prueba

El triple "A":

- Arrange - Arreglar: Configurar el entorno y los datos necesarios para la prueba.
- Act - Actuar: Ejecutar la funcionalidad que se está probando.
- Assert - Afirmar: Verificar que el resultado obtenido coincide con el resultado esperado.
