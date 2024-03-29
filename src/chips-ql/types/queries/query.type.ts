import { Delete } from "./delete.type";
import { Insert } from "./insert.type";
import { Select } from "./select.type";
import { Update } from "./update.type";

export type Query<T extends Object> = Select<T> | Insert<T> | Update<T> | Delete<T>;

export enum QueryType {
    SELECT = 'select',
    INSERT = 'insert',
    UPDATE = 'update',
    DELETE = 'delete',
}