import { Expose } from 'class-transformer';
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

export interface PaginateOptions {
  limit: number;
  currentPage: number;
  total?: boolean;
}

export class PaginationResult<T> {
  constructor(partial: Partial<PaginationResult<T>>) {
    Object.assign(this, partial);
  }

  @Expose()
  first: number;

  @Expose()
  last: number;

  @Expose()
  limit: number;

  @Expose()
  total?: number;

  @Expose()
  data: T[];
}

export async function paginate<T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  options: PaginateOptions = {
    limit: 10,
    currentPage: 1,
  },
): Promise<PaginationResult<T>> {
  const offset = (options.currentPage - 1) * options.limit;
  const data = await queryBuilder.limit(options.limit).offset(offset).getMany();

  return new PaginationResult({
    first: offset + 1,
    last: offset + data.length,
    limit: options.limit,
    total: options.total ? await queryBuilder.getCount() : undefined,
    data,
  });
}
