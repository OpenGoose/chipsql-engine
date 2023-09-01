import { Where } from "../conditions/where.type";
import { Table } from "../tables/table.type";
import { ValuesObject } from "../values/values-object.type";
import { QueryTypes } from "./query.type";

export interface Update<T extends Object> {
    queryType: QueryTypes.UPDATE;
    from: Table<T>;
    values: ValuesObject<T>;
    where?: Where<T>;
}