import { Query } from "../../chips-lq/types/queries/query.type";
import { SqlLanguages } from "../../sql/sql-languages.enum";
import { QueryWarningsService } from "../../warnings/query-warnings.service";
import { QueryCompilerOptions } from "./query-compiler-options.type";

export abstract class QueryWarnings<T extends Object = Object> {

  constructor (
    protected readonly query: Query<T>,
    protected readonly language: SqlLanguages,
    protected readonly queryCompilerOptions?: QueryCompilerOptions,
  ) {}

  abstract processWarnings: () => QueryWarningsService<T>;

}