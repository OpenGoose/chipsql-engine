import { MssqlDataType } from "../../languages/mssql/datatypes/mssql-datatypes-list.enum";

export const MSSQL_DATATYPES_MAP = {
    [MssqlDataType.BIT]: 'BIT',
    [MssqlDataType.DATETIME2]: 'DATETIME2',
    [MssqlDataType.DATE]: 'DATE',

    [MssqlDataType.INT]: 'INT',
    [MssqlDataType.DECIMAL]: 'DECIMAL',
    [MssqlDataType.BIGINT]: 'BIGINT',
    [MssqlDataType.TINYINT]: 'TINYINT',
    [MssqlDataType.SMALLINT]: 'SMALLINT',
    [MssqlDataType.MONEY]: 'MONEY',
    [MssqlDataType.SMALLMONEY]: 'SMALLMONEY',
    [MssqlDataType.FLOAT]: 'FLOAT',
    [MssqlDataType.REAL]: 'REAL',

    [MssqlDataType.VARCHAR]: 'VARCHAR'
}