import { MssqlDataTypes } from "../../languages/mssql/datatypes/mssql-datatypes-list.enum";

export const MSSQL_DATATYPES_MAP = {
    [MssqlDataTypes.BIT]: 'BIT',
    [MssqlDataTypes.DATETIME2]: 'DATETIME2',
    [MssqlDataTypes.DATE]: 'DATE',

    [MssqlDataTypes.INT]: 'INT',
    [MssqlDataTypes.DECIMAL]: 'DECIMAL',
    [MssqlDataTypes.BIGINT]: 'BIGINT',
    [MssqlDataTypes.TINYINT]: 'TINYINT',
    [MssqlDataTypes.SMALLINT]: 'SMALLINT',
    [MssqlDataTypes.MONEY]: 'MONEY',
    [MssqlDataTypes.SMALLMONEY]: 'SMALLMONEY',
    [MssqlDataTypes.FLOAT]: 'FLOAT',
    [MssqlDataTypes.REAL]: 'REAL',

    [MssqlDataTypes.VARCHAR]: 'VARCHAR'
}