import { Where } from "../conditions/where.type";
import { Join } from "../joins/join.type";
import { Limit } from "../limit/limit.type";
import { Table } from "../tables/table.type";
import { Set } from "../values/set.type";
import { QueryType } from "./query.type";

export interface Update<T extends Object> {
  queryType: QueryType.UPDATE;
  from: Table<T>;
  values: Set<T>;
  where?: Where<T>;
  joins?: Join<T>[];
  limit?: Limit<T>;
}
