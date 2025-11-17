import { sum } from './sum.helper';

//agrupa y describe las pruebas
describe('sum-helper.ts', () => {
  it('shouldsum two numbers', () => {
    // Arrange
    const num1 = 10;
    const num2 = 20;

    // Act
    const result = sum(num1, num2);

    // Assert
    expect(result).toBe(num1 + num2);
  });
});
