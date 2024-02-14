import { MssqlDataTypes } from "../../../../languages/mssql/datatypes/mssql-datatypes-list.enum";
import { DataType } from "../datatypes.enum";

// T = all supported DB engines datatypes

export type RawDatatypeOptions<T extends MssqlDataTypes, K extends DataType, F extends object> = {
    dataType: K;
    rawDataType: T;
} | (F & { dataType: K });