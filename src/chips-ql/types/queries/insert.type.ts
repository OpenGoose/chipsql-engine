import { Table } from "../tables/table.type";
import { ValuesObject } from "../values/values-object.type";
import { InsertOptions } from "./options/insert-options.type";
import { QueryType } from "./query.type";

export interface Insert<T extends Object> {
  queryType: QueryType.INSERT;
  into: Table<T>;
  values: ValuesObject<T>[];

  options?: InsertOptions;
}
