import { MssqlDataType } from "../../datatypes/mssql-datatypes-list.enum";

export const MSSQL_NUMERIC_DATATYPES = [MssqlDataType.INT, MssqlDataType.DECIMAL, MssqlDataType.BIGINT, MssqlDataType.TINYINT,MssqlDataType.SMALLINT, MssqlDataType.MONEY, MssqlDataType.SMALLMONEY, MssqlDataType.FLOAT, MssqlDataType.REAL] as const;