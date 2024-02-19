import { MssqlDataTypes } from "../../languages/mssql/datatypes/mssql-datatypes-list.enum";

export const MSSQL_DATATYPES_MAP = {
    [MssqlDataTypes.BIT]: 'BIT',
    [MssqlDataTypes.DATETIME2]: 'DATETIME2',
    [MssqlDataTypes.DATE]: 'DATE',

    [MssqlDataTypes.DECIMAL]: 'DECIMAL',
    [MssqlDataTypes.INT]: 'INT',
    [MssqlDataTypes.BIGINT]: 'BIGINT',
    [MssqlDataTypes.TINYINT]: 'TINYINT',

    [MssqlDataTypes.VARCHAR]: 'VARCHAR'
}