import { Query } from "../chips-ql/types/queries/query.type";
import { SqlLanguages } from "../sql/sql-languages.enum";
import { QueryWarningsService } from "./query-warnings.service";
import { QueryCompilerOptions } from "../compiler/query/query-compiler-options.type";

export abstract class QueryWarnings<T extends NonNullable<unknown> = NonNullable<unknown>> {

  constructor (
    protected readonly query: Query<T>,
    protected readonly language: SqlLanguages,
    protected readonly queryCompilerOptions?: QueryCompilerOptions,
  ) {}

  abstract processWarnings: () => QueryWarningsService<T>;

}