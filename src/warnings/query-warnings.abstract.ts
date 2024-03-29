import { Query } from "../chips-ql/types/queries/query.type";
import { SqlLanguage } from "../sql/sql-languages.enum";
import { QueryWarningsService } from "./query-warnings.service";
import { QueryCompilerOptions } from "../compiler/query/query-compiler-options.type";

export abstract class QueryWarnings<T extends Object = Object> {

  constructor (
    protected readonly query: Query<T>,
    protected readonly language: SqlLanguage,
    protected readonly queryCompilerOptions?: QueryCompilerOptions,
  ) {}

  abstract processWarnings: () => QueryWarningsService<T>;

}