import { Table } from "./table.type";

export type From<T extends NonNullable<unknown>> = Table<T>[];