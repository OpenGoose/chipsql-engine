import { Where } from "../conditions/where.type";
import { GroupBy } from "../grouping/group-by.type";
import { Join } from "../joins/join.type";
import { Limit } from "../limit/limit.type";
import { OrderBy } from "../order/order-by.type";
import { From } from "../tables/from.type";
import { Table } from "../tables/table.type";
import { Value } from "../values/value.type";
import { QueryType } from "./query.type";

export interface Select<T extends Object> {
  queryType: QueryType.SELECT;
  where?: Where<T>;
  fields: Value<T>[];
  from: From<T>;
  joins?: Join<T>[];

  groupBy?: GroupBy<T>[];
  having?: Where<T>;

  orderBy?: OrderBy<T>[];

  limit?: Limit<T>;
  offset?: Value<T>;

  into?: Table<Object>;
}
