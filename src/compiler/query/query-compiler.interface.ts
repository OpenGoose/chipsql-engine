import { Insert } from "../../chips-lq/types/queries/insert.type";
import { Query } from "../../chips-lq/types/queries/query.type";
import { Select } from "../../chips-lq/types/queries/select.type";

export interface IQueryCompiler<T extends Object> {
  readonly query: Query<T>;
  compile: () => string;
  compileSelect: (select: Select<T>) => string;
  compileInsert: (insert: Insert<T>) => string;
}
