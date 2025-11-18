import 'reflect-metadata';

import { validate } from 'class-validator';
import { PaginationDto } from './pagination.dto';

describe('PaginationDto', () => {
  it('should validate with default values', async () => {
    const dto = new PaginationDto();
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
