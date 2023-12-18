import { Where } from "../conditions/where.type";
import { Limit } from "../limit/limit.type";
import { Table } from "../tables/table.type";
import { Set } from "../values/set.type";
import { QueryTypes } from "./query.type";

export interface Update<T extends Object> {
  queryType: QueryTypes.UPDATE;
  from: Table<T>;
  values: Set<T>;
  where?: Where<T>;
  limit?: Limit<T>;
}
