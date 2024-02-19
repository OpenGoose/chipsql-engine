import { MssqlDataTypes } from "../../../../languages/mssql/datatypes/mssql-datatypes-list.enum";
import { Value } from "../../values/value.type";
import { DataType } from "../datatypes.enum";

// T = all supported DB engines datatypes
type Types = MssqlDataTypes;

export type DataTypeOptions<T extends Types, K extends DataType, F extends object> = {
    dataType: K;
    rawDataType: T;
    params?: Value<object>[];
} | (F & { dataType: K, rawDataType?: null });