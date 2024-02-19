import { MssqlDataType } from "../../../../languages/mssql/datatypes/mssql-datatypes-list.enum";
import { Value } from "../../values/value.type";
import { DataType } from "../datatypes.enum";

// T = all supported DB engines datatypes
type Types = MssqlDataType;

export type DataTypeOptions<T extends Types, K extends DataType, F extends object> = {
    dataType: K;
    rawDataType: T;
    params?: Value<object>[];
} | (Omit<F, 'dataType' | 'rawDataType'> & { dataType: K, rawDataType?: null });