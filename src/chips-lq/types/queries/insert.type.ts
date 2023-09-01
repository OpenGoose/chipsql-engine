import { Table } from "../tables/table.type";
import { ValuesObject } from "../values/values-object.type";
import { QueryTypes } from "./query.type";

export interface Insert<T extends Object> {
    queryType: QueryTypes.INSERT;
    into: Table<T>;
    values: ValuesObject<T>[];
}