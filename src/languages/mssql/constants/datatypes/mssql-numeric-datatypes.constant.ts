import { MssqlDataTypes } from "../../datatypes/mssql-datatypes-list.enum";

export const MSSQL_NUMERIC_DATATYPES = [MssqlDataTypes.INT, MssqlDataTypes.DECIMAL, MssqlDataTypes.BIGINT, MssqlDataTypes.TINYINT,MssqlDataTypes.SMALLINT, MssqlDataTypes.MONEY, MssqlDataTypes.SMALLMONEY, MssqlDataTypes.FLOAT, MssqlDataTypes.REAL] as const;