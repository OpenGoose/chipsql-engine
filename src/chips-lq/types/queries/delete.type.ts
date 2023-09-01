import { Where } from "../conditions/where.type";
import { Table } from "../tables/table.type";
import { QueryTypes } from "./query.type";

export interface Delete<T extends Object> {
    queryType: QueryTypes.DELETE;
    from: Table<T>;
    where?: Where<T>;
}