import { Insert } from "../../chips-ql/types/queries/insert.type";
import { Query } from "../../chips-ql/types/queries/query.type";
import { Select } from "../../chips-ql/types/queries/select.type";
import { Delete } from '../../chips-ql/types/queries/delete.type';

export interface IQueryCompiler<T extends Object> {
  readonly query: Query<T>;
  compile: () => string;
  compileSelect: (select: Select<T>) => string;
  compileInsert: (insert: Insert<T>) => string;
  compileDelete: (del: Delete<T>) => string;
}
