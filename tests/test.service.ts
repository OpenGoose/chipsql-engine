import { compile } from "../src";
import { Query } from "../src/chips-lq/types/queries/query.type";
import { SqlLanguages } from "../src/sql/sql-languages.enum";

export class TestService {
  constructor(private readonly language: SqlLanguages) {}

  expectQuery = <T extends Object = Object>(
    name: string,
    query: Query<T>,
    toBe: string
  ) => {
    test(name, () => {
        expect(compile(query, this.language)).toBe(toBe);
    });
  };
}