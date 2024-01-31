import { Delete } from "./delete.type";
import { Insert } from "./insert.type";
import { Select } from "./select.type";
import { Update } from "./update.type";

export type Query<T extends NonNullable<unknown>> = Select<T> | Insert<T> | Update<T> | Delete<T>;

export enum QueryTypes {
    SELECT = 'select',
    INSERT = 'insert',
    UPDATE = 'update',
    DELETE = 'delete',
}